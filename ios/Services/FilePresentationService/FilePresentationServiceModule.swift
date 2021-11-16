import Foundation
import VoxeetSDK

// MARK: - Supported Events
private enum EventKeys: String, CaseIterable {
	/// Emitted when the file is converted.
	case fileConverted = "EVENT_FILEPRESENTATION_FILE_CONVERTED"
	/// Emitted when the presenter started the file presentation.
	case filePresentationStarted = "EVENT_FILEPRESENTATION_STARTED"
	/// Emitted when the presenter ended the file presentation.
	case filePresentationStopped = "EVENT_FILEPRESENTATION_STOPPED"
	/// Emitted when the presenter changed the displayed page of the shared file.
	case filePresentationUpdated = "EVENT_FILEPRESENTATION_UPDATED"
}

@objc(RNFilePresentationServiceModule)
public class FilePresentationServiceModule: ReactEmitter {

	@Atomic
	private var fileConvertedCache: [String: VTFileConverted] = [:]

	var current: VTFilePresentation? {
		VoxeetSDK.shared.filePresentation.current
	}

	// MARK: - Events Setup
	@objc(supportedEvents)
	override public func supportedEvents() -> [String] {
		return EventKeys.allCases.mapToStrings()
	}

	public override func startObserving() {
		super.startObserving()
		VoxeetSDK.shared.filePresentation.delegate = self;
	}

	public override func stopObserving() {
		super.stopObserving()
		VoxeetSDK.shared.filePresentation.delegate = nil;
	}

	// MARK: - Methods
	/// Gets current file presentation.
	/// - Parameters:
	///   - resolve: returns FilePresentation object on success
	///   - reject: returns error on failure
	@objc(getCurrent:rejecter:)
	public func getCurrent(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let filePresentation = current else {
			ModuleError.noCurrentFilePresentation.send(with: reject)
			return
		}
		resolve(filePresentation.toReactModel())
	}

	/// Converts the user-provided file into multiple pages, as images, that can be shared during the file presentation.
	/// - Parameters:
	///   - file: file model with url to convert
	///   - resolve: returns converted file on success
	///   - reject: returns error on failure
	@objc(convert:resolver:rejecter:)
	public func convert(
		file: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let url = FileModel.create(with: file).fileUrl else {
			ModuleError.noUrlProvided.send(with: reject)
			return
		}
		VoxeetSDK.shared.filePresentation.convert(path: url, progress: nil) { fileConverted in
			resolve(fileConverted.toReactModel())
		} fail: { error in
			error.send(with: reject)
		}
	}

	/// Starts a file presentation.
	/// - Parameters:
	///   - file: converted file to present
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(start:resolver:rejecter:)
	public func start(
		file: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let fileConverted = getCachedFileConverted(id: file.identifier) else {
			ModuleError.invalidFile(file.description).send(with: reject)
			return
		}

		VoxeetSDK.shared.filePresentation.start(fileConverted: fileConverted) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}

	/// Stops a file presentation.
	/// - Parameters:
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(stop:rejecter:)
	public func stop(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.filePresentation.stop { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}

	// MARK: - Getters

	/// Downloads and displays locally the presented file by retrieving URLs of the individual images.
	/// - Parameters:
	///	  - page: The number of the presented page.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(getImage:resolver:rejecter:)
	public func getImage(
		page: Int,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let url = VoxeetSDK.shared.filePresentation.image(page: page) else {
			ModuleError.noImageForPage(page).send(with: reject)
			return
		}
		resolve(url.toReactModelValue())
	}

	/// Provides the thumbnail's URL that refers to a specific page of the presented file.
	/// - Parameters:
	///	  - page: The number of the presented page.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(getThumbnail:resolver:rejecter:)
	public func getThumbnail(
		page: Int,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let url = VoxeetSDK.shared.filePresentation.thumbnail(page: page) else {
			ModuleError.noThumbnailForPage(page).send(with: reject)
			return
		}
		resolve(url.toReactModelValue())
	}

	// MARK: - Setters

	/// Informs the service to send the updated page number to the conference participants.
	/// - Parameters:
	///	  - page: The page number that corresponds to the page that should be presented.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(setPage:resolver:rejecter:)
	public func setPage(
		page: Int,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.filePresentation.update(page: page) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
}

extension FilePresentationServiceModule: VTFilePresentationDelegate {

	public func converted(fileConverted: VTFileConverted) {
		cacheFileConverted(fileConverted: fileConverted)
		send(
			event: EventKeys.fileConverted,
			body: FileConvertedDTO(
				fileConverted: fileConverted
			).toReactModel()
		)
	}

	public func started(filePresentation: VTFilePresentation) {
		send(
			event: EventKeys.filePresentationStarted,
			body: FilePresentedDTO(
				filePresentation: filePresentation
			).toReactModel()
		)
	}

	public func updated(filePresentation: VTFilePresentation) {
		send(
			event: EventKeys.filePresentationUpdated,
			body: FilePresentedDTO(
				filePresentation: filePresentation
			).toReactModel()
		)
	}

	public func stopped(filePresentation: VTFilePresentation) {
		send(
			event: EventKeys.filePresentationStopped,
			body: FilePresentedDTO(
				filePresentation: filePresentation
			).toReactModel()
		)
	}
}

private extension FilePresentationServiceModule {

	func cacheFileConverted(fileConverted: VTFileConverted) {
		fileConvertedCache[fileConverted.id] = fileConverted
	}

	func getCachedFileConverted(id: String?) -> VTFileConverted? {
		guard let id = id else { return nil }
		return fileConvertedCache[id]
	}
}
