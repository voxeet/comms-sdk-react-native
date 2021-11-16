/// Extension of URL class for mapping to the react model.
extension URL: ReactModelValueMappable {

	func toReactModelValue() -> String? {
		return absoluteString
	}
}
