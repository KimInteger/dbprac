const root = document.getElementById('root');
const testForm = document.getElementById('testForm');

testForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  let formData = new FormData(this);
  let data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  console.log('Sending data:', data); // 데이터 전송 확인용 로그

  try {
    const response = await fetch('/update', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    console.log('Response from server:', response); // 서버 응답 확인용 로그

    const result = await response.json();
    console.log('Result from server:', result); // 서버 결과 확인용 로그

    root.textContent = JSON.stringify(result, null, 2);
  } catch (error) {
    console.error('Error:', error);
  }
});