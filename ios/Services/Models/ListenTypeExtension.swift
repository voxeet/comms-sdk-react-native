import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension ListenType: ReactModelValueMappable {

    typealias ReactModelValueType = String?

    static func create(with value: String?) -> ListenType? {
        guard let value = value else {
            return nil
        }
        switch value {
        case "MIXED":
            return .mixed
        case "REGULAR":
            return .regular
        default:
            return nil
        }
    }
    
    func toReactModelValue() -> ReactModelValueType {
        switch self {
        case .mixed:
            return "MIXED"
        case .regular:
            return "REGULAR"
        @unknown default:
            return nil
        }
    }
}

