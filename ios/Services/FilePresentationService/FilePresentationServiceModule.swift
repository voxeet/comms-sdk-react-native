import Foundation
import VoxeetSDK

@objc(RNFilePresentationServiceModule)
public class FilePresentationServiceModule: NSObject {

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
