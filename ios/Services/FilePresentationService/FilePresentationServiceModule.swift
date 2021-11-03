import Foundation
import VoxeetSDK

// MARK: - Supported Events
private enum EventKeys: String, CaseIterable {
	/// Emitted when the file is converted.
	case fileConverted = "EVENT_FILEPRESENTATION_FILE_CONVERTED"
}

@objc(RNFilePresentationServiceModule)
public class FilePresentationServiceModule: ReactEmitter {
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
	@objc(resolver:rejecter:)
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
}

extension FilePresentationServiceModule: VTFilePresentationDelegate {

	public func converted(fileConverted: VTFileConverted) {
		send(
			event: EventKeys.fileConverted,
			body: FileConvertedDTO(
				fileConverted: fileConverted
			).toReactModel()
		)
	}

	public func started(filePresentation: VTFilePresentation) {
	}

	public func updated(filePresentation: VTFilePresentation) {
	}

	public func stopped(filePresentation: VTFilePresentation) {
	}
}
