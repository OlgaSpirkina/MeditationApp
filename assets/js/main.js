let checkboxArr = [];
const typeOfContentFilter = (someData) => {
  someData.forEach(elem => {
    checkboxArr.push(elem.class[2])
  })
  checkboxArr.push("All Categories");
  checkboxArr = checkboxArr.filter(function(m, index){
    return checkboxArr.indexOf(m) === index;
  }).sort();
  console.log(checkboxArr);
}
async function fetchVideos(){
  const res = await fetch('https://my-json-server.typicode.com/OlgaSpirkina/MeditationApp/videos');
  if (!res.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await res.json();
  typeOfContentFilter(data)
  return data;
}
fetchVideos().catch(error => {
  error.message;
});
