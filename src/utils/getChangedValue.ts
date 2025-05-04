export const getChangedValues = <T extends Record<string, any>>(
  values: T,
  initialValues: T,
): Partial<T> => {
  // Create a copy of values to avoid modifying the original
  const changedValues: Partial<T> = {};

  // Check each field for changes
  Object.entries(values).forEach(([key, value]) => {
    const initialValue = initialValues[key as keyof T];
    const hasChanged = initialValue !== value;

    // Only include the field if it has changed AND it's a valid value
    // For location and category, we only want to include them if they're valid selections
    if (hasChanged) {
      // For location and category, we only want to include if they're not the placeholder text
      if (key === "location") {
        if (value && value !== "Select location" && validateLocation(value)) {
          changedValues[key as keyof T] = value;
        }
      } else if (key === "category") {
        if (value && value !== "Select category" && validateCategory(value)) {
          changedValues[key as keyof T] = value;
        }
      } else {
        // For all other fields, include them if they've changed
        changedValues[key as keyof T] = value;
      }
    }
  });

  return changedValues;
};

// Helper functions to validate location and category
const validateLocation = (location: string): boolean => {
  const validLocations = [
    "JAKARTA",
    "BANDUNG",
    "SURABAYA",
    "YOGYAKARTA",
    "SEMARANG",
  ];
  return validLocations.includes(location.toUpperCase());
};

const validateCategory = (category: string): boolean => {
  const validCategories = [
    "MUSIC",
    "EDUCATION",
    "CULTURE",
    "BUSINESS",
    "FASHION",
    "SPORT",
  ];
  return validCategories.includes(category.toUpperCase());
};
