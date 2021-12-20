import ReplayKit
import VoxeetScreenShareKit

class SampleHandler: RPBroadcastSampleHandler {
  private var screenShareService: VoxeetScreenShareKit?

  override func broadcastStarted(withSetupInfo setupInfo: [String : NSObject]?) {
    guard let appGroup = Bundle.appGroup else { return }
    screenShareService = VoxeetScreenShareKit(appGroup: appGroup)
    screenShareService?.delegate = self
    screenShareService?.broadcastStarted(withSetupInfo: setupInfo)
  }

  override func broadcastPaused() {
    screenShareService?.broadcastPaused()
  }

  override func broadcastResumed() {
    screenShareService?.broadcastResumed()
  }

  override func broadcastFinished() {
    screenShareService?.broadcastFinished()
  }

  override func processSampleBuffer(_ sampleBuffer: CMSampleBuffer, with sampleBufferType: RPSampleBufferType) {
    screenShareService?.processSampleBuffer(sampleBuffer, with: sampleBufferType)
  }
}

// MARK: - VoxeetScreenShareKitDelegate
extension SampleHandler: VoxeetScreenShareKitDelegate {

  func finishBroadcastWithError(error: Error) {
    super.finishBroadcastWithError(error)
  }
}

private extension Bundle {
  /// Returns the App Group name from main Info.plist file
  static var appGroup: String? {
    return Bundle.main.object(forInfoDictionaryKey: "CommsSDKAppGroupKey") as? String
  }
}
