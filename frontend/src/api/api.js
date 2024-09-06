export const getAlternatives = async (medicineName) => {
  try {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const response = await fetch(`${apiBaseUrl}/predict_alternative`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ medicine_name: medicineName }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.alternatives && Array.isArray(data.alternatives)) {
      return {
        alternatives: data.alternatives,
        message: data.message || '',
      };
    } else {
      return {
        alternatives: [],
        message: 'No alternatives found.',
      };
    }
  } catch (error) {
    console.error('Error fetching alternatives:', error);
    return {
      alternatives: [],
      message: 'An error occurred while fetching alternatives.',
    };
  }
};
