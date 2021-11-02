package io.dolby.sdk;

import androidx.annotation.NonNull;

import com.voxeet.promise.Promise;
import com.voxeet.promise.solve.Solver;
import com.voxeet.sdk.events.error.HttpException;
import com.voxeet.sdk.json.FilePresentationStarted;
import com.voxeet.sdk.json.FilePresentationStopped;
import com.voxeet.sdk.json.FilePresentationUpdated;
import com.voxeet.sdk.models.v1.FilePresentationConverted;
import com.voxeet.sdk.models.v2.ServerErrorOrigin;
import com.voxeet.sdk.network.endpoints.IRestApiFilePresentation;
import com.voxeet.sdk.network.endpoints.IRestApiFilePresentation.FilePresentationId;
import com.voxeet.sdk.services.SdkEnvironmentHolder;
import com.voxeet.sdk.services.abstracts.AbstractPresentationService;
import com.voxeet.sdk.services.presentation.PresentationState;
import com.voxeet.sdk.services.presentation.file.FilePresentation;
import com.voxeet.sdk.utils.HttpHelper;
import com.voxeet.sdk.utils.Opt;

import org.greenrobot.eventbus.Subscribe;
import org.jetbrains.annotations.Nullable;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.UUID;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Response;

/**
 * {@link FilePresentationService} is based on {@link com.voxeet.sdk.services.FilePresentationService}.
 * No any api changes, only critical bugs fixes:
 * - never resolved promises
 * - wrong api methods invoked
 * - duplicating {@link FilePresentation} instances in list after handling events
 */
public class FilePresentationService extends AbstractPresentationService<FilePresentation, IRestApiFilePresentation> {
  private static final String TAG = FilePresentationService.class.getSimpleName();
  private final HashMap<String, Solver<FilePresentation>> mCacheSolvers = new HashMap<>();
  private final HashMap<String, Solver<FilePresentation>> mCacheStartedSolvers = new HashMap<>();
  private final HashMap<String, Solver<FilePresentation>> mCacheStoppedSolvers = new HashMap<>();
  private final HashMap<String, Solver<FilePresentation>> mCacheUpdatedSolvers = new HashMap<>();

  private final HashMap<String, Solver<FilePresentation>> mOriginCacheSolvers;

  public FilePresentationService(
    @NonNull SdkEnvironmentHolder instance,
    HashMap<String, Solver<FilePresentation>> originCacheSolvers
  ) {
    super(instance);
    this.registerEventBus();
    this.mOriginCacheSolvers = originCacheSolvers;
  }

  @Nullable
  protected IRestApiFilePresentation service() {
    return (IRestApiFilePresentation) this.getWebService(IRestApiFilePresentation.class);
  }

  @Subscribe
  public void on(FilePresentationConverted event) {
    String solverKey = findSolverFor(event.name);
    FilePresentation information = this.getPresentationInformation(event.fileId);
    information.state = PresentationState.CONVERTED;
    information.page = 0;
    information.nbPage = event.nbImageConverted;
    this.tryUnlock(solverKey, information, this.mCacheSolvers);
  }

  @Subscribe
  public void on(FilePresentationStarted event) {
    FilePresentation information = this.getPresentationInformation(event.fileId);
    information.state = PresentationState.STARTED;
    information.page = event.position;
    information.nbPage = event.imageCount;
    this.tryUnlock(information.key, information, this.mCacheStartedSolvers);
  }

  @Subscribe
  public void on(FilePresentationUpdated event) {
    FilePresentation information = this.getPresentationInformation(event.fileId);
    information.state = PresentationState.SEEK;
    information.page = event.position;
    this.tryUnlock(information.key, information, this.mCacheUpdatedSolvers);
  }

  @Subscribe
  public void on(FilePresentationStopped event) {
    FilePresentation information = this.getPresentationInformation(event.fileId);
    information.state = PresentationState.STOP;
    this.tryUnlock(information.key, information, this.mCacheStoppedSolvers);
  }

  @Nullable
  public String getImage(String fileId, int pageNumber) {
    String url = this.getURLRoot();
    return null == url ? null : String.format(Locale.getDefault(), "%s/v1/files/%s/converted/%d?token=%s", url, fileId, pageNumber, this.getInternalJwtToken());
  }

  @Nullable
  public String getThumbnail(String fileId, int pageNumber) {
    String url = this.getURLRoot();
    return null == url ? null : String.format(Locale.getDefault(), "%s/v1/files/%s/converted/%d/thumbnail?token=%s", url, fileId, pageNumber, this.getInternalJwtToken());
  }

  @NonNull
  public Promise<FilePresentation> convertFile(@NonNull java.io.File file) {
    return this.createPromise((api, solver) -> {
      String uuid = UUID.randomUUID().toString();
      String appended_name = uuid + file.getName();
      RequestBody requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), file);
      MultipartBody.Part body = MultipartBody.Part.createFormData("file", appended_name, requestFile);
      HttpHelper.promise(api.convertFile(requestFile, body), ServerErrorOrigin.CONVERT_FILE).then((result) -> {
        Response<ResponseBody> response = (Response) Opt.of(result).then((c) -> c.response).orNull();
        if ((Boolean) Opt.of(response).then(Response::isSuccessful).or(false)) {
          this.mCacheSolvers.put(uuid, solver);
          this.mOriginCacheSolvers.put(uuid, solver);
        } else {
          solver.reject(HttpException.throwResponse(response));
        }

      }).error(solver::reject);
    });
  }

  @NonNull
  public Promise<FilePresentation> start(@NonNull FilePresentationConverted body) {
    return this.start(body, 0);
  }

  @NonNull
  public Promise<FilePresentation> start(@NonNull FilePresentationConverted body, int position) {
    return this.createPromise((api, solver) -> {
      FilePresentationId body_sent = new FilePresentationId(body.fileId, body.name, position, body.nbImageConverted);
      this.consumeInternalCall(solver, body.fileId, this.mCacheStartedSolvers, this.internalCall(api.startFilePresentation(this.getConferenceId(), body_sent)));
    });
  }

  @NonNull
  public Promise<FilePresentation> stop(@NonNull String fileId) {
    return this.createPromise((api, solver) -> {
      FilePresentationId body_sent = new FilePresentationId(fileId);
      this.consumeInternalCall(solver, fileId, this.mCacheStoppedSolvers, this.internalCall(api.stopFilePresentation(this.getConferenceId(), body_sent)));
    });
  }

  @NonNull
  public Promise<FilePresentation> update(@NonNull String fileId, int position) {
    return this.createPromise((api, solver) -> {
      FilePresentationId body_sent = new FilePresentationId(fileId, position);
      this.consumeInternalCall(solver, fileId, this.mCacheUpdatedSolvers, this.internalCall(api.updateFilePresentation(this.getConferenceId(), body_sent)));
    });
  }

  @Nullable
  private String findSolverFor(@NonNull String name) {
    Iterator<String> var2 = this.mCacheSolvers.keySet().iterator();

    String value;
    do {
      if (!var2.hasNext()) {
        return null;
      }

      value = (String) var2.next();
    } while (name.indexOf(value) != 0);

    return value;
  }

  @NonNull
  private FilePresentation getPresentationInformation(@NonNull String key) {
    Iterator<FilePresentation> var2 = this.presentations.iterator();

    FilePresentation information;
    do {
      if (!var2.hasNext()) {
        information = new FilePresentation(key, "");
        presentations.add(information);
        return information;
      }

      information = (FilePresentation) var2.next();
    } while (!key.equals(information.key));

    return information;
  }
}
