import Foundation

internal extension Array where Element: RawRepresentable {

	func mapToStrings() -> [Element.RawValue] where Element.RawValue == String {
		self.map { $0.rawValue }
	}
}
