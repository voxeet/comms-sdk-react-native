package io.dolby.sdk

import com.voxeet.VoxeetSDK
import com.voxeet.promise.solve.Solver
import com.voxeet.sdk.services.SdkEnvironmentHolder
import com.voxeet.sdk.services.presentation.file.FilePresentation
import java.lang.reflect.Field
import java.util.HashMap

@Suppress("unchecked_cast")
fun VoxeetSDK.filePresentation(): FilePresentationService {
  val origin = VoxeetSDK.filePresentation()
  if (!::sdkEnvironmentField.isInitialized) {
    val field = requireNotNull(javaClass.superclass?.getDeclaredField("_sdk_environment_holder"))
    field.isAccessible = true
    sdkEnvironmentField = field
  }
  if (!::originCacheSolversField.isInitialized) {
    val field = origin.javaClass.getDeclaredField("mCacheSolvers")
    field.isAccessible = true
    originCacheSolversField = field
  }
  val sdkEnvironment = sdkEnvironmentField.get(this) as SdkEnvironmentHolder
  val originCacheSolvers = originCacheSolversField.get(origin) as HashMap<String, Solver<FilePresentation>>
  return FilePresentationService(sdkEnvironment, originCacheSolvers)
}

private lateinit var sdkEnvironmentField: Field
private lateinit var originCacheSolversField: Field
