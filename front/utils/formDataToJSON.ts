const formDataToJSON = (formData: FormData): Record<string, string | string[]> => {
	const result = {} as Record<string, string | string[]>;
	const entries = formData.entries() as unknown as [string, string][];

	for (const [key, value] of entries) {
		if (!(key in result)) {
			result[key] = value;
			continue;
		}

		if (!Array.isArray(result[key])) {
			result[key] = [result[key], value];
			continue;
		}

		result[key].push(value);
	}

	return result;
}

export default formDataToJSON;
