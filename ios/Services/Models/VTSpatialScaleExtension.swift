import Foundation
import VoxeetSDK

internal extension VTSpatialScale {
    
    /// Creates instance of the class from react model.
    /// - Parameter dictionary: react model dictionary
    /// - Returns: VTSpatialScale
    static func create(with dictionary: [String: Any]) -> VTSpatialScale {
        return VTSpatialScale(x: dictionary.value(for: Keys.x) ?? 0,
                              y: dictionary.value(for: Keys.y) ?? 0,
                              z: dictionary.value(for: Keys.z) ?? 0)
    }
}

// MARK: - ReactModelMappable
extension VTSpatialScale: ReactModelMappable {
    
    func toReactModel() -> ReactModelType {
        return [
            Keys.x: x,
            Keys.y: y,
            Keys.z: z
        ].mapKeysToRawValue()
    }
}

// MARK: - ReactModel Keys
private enum Keys: String {
    case x, y, z
}

