// Create a Jest mock function with the same name as the function we're mocking

const fetchWeather = jest.fn(() => {  
	//Return a resolved Promise with a mock response object  
	return Promise.resolve({     
		current: {
      condition: {
        text: '',
      },
    },
    temp_c: '',
    temp_f: '',
	});
});

export default fetchWeather;