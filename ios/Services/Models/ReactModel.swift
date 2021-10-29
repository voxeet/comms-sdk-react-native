import Foundation

/// Represents the React Model type
internal typealias ReactModelType = [String: Any]

internal protocol ReactModelMappable {

	/// Returns the React Model representation for the object
	/// - Returns: ReactModelType
	func toReactModel() -> ReactModelType
}

/// Helps convert unsupported types in react  enum, struct, bool
internal protocol ReactModelValueMappable {

	associatedtype ReactModelValueType

	/// Returns the React Model value for the object
	/// - Returns: ReactModelValueType
	func toReactModelValue() -> ReactModelValueType
}

