window.onload = function(){ 

  const givenString = prompt("Please enter positive numbers separated by commas(,):");
  if(givenString){
    const input = givenString.split(",").map(item => item.trim());
    let inputArray = [];
    let isValid = false;

    for(const x of input){
      let number = Number(x);
      if(!isNaN(number) && Number.isInteger(number) && number >= 0){
        inputArray.push(number);
      }else{
        alert(`Invalid input: "${x}". Please enter only positive integers.`);
        isValid = true;
        break; 
      }
    }

    if(!isValid){
      //printing the user input array
      document.getElementById("userinput").innerHTML = `
      <div>
        <h2>Input array: </h2>
      </div> 
      <div class="box"> 
      [ ${inputArray.join(", ")} ]
      </div>`;
      calculateWaterStored(inputArray);
    }else{
      setTimeout(() =>{
        window.location.reload();
      }, 200); 
    }

  }else{
    console.log("User cancelled.");
    alert("Please enter numbers");
    setTimeout(() =>{
      window.location.reload();
    }, 200); 
  }
}

// solution based on `n` always greater than -1 and water stored only in-between the blocks(positive int in the array) 
function calculateWaterStored(pillarArray){

  let start = -1;
  let end = 0;
  let totalCount = 0;
  let waterArray = [];
  let max = 0;

  for(let i = 0; i < pillarArray.length; i++){
    if( pillarArray[i] > max ){
      max = pillarArray[i];
    }
    if( pillarArray[i] > 0 ){
      if(start === -1 ){
        start = i;
        end = i;
      }else{
        if(start !=  end){
          let val = (pillarArray[i] > pillarArray[start]) ? pillarArray[start] : pillarArray[i];
          let span = end - start;
          totalCount += val * span;
          let temp = Array(span).fill(val);
          waterArray.push(...temp);
        }
        start = i;
        end = i;
      }
      waterArray.push(0);
    }else if( (pillarArray[i] == 0) && (start != -1) ){
      end = i;
      if(end == pillarArray.length -1){
        let temp = Array(end - start).fill(0);
        waterArray.push(...temp);
      }
    }else{
      waterArray.push(0);
    }
  }

  displayWaterStored(waterArray,totalCount,max);

}

function displayWaterStored(waterArray,total,max){
  console.log(waterArray)
  let content =  `<div>
        <h2>Output: </h2>
      </div> 
      <div id= 'finaltotal'>
        <h3>Total units: ${total} </h3>
      </div>`; 
  content += "<table><tbody>"; 
  // Table display with water stored
  for( let i = 0; i < max + 2; i++ ){
    content += "<tr>";
    for( let j = 0; j < waterArray.length; j++ ){
      if( i == 0 ){
        content += `<td></td>`;
      }else if(i == max + 1){
        content += `<td class= 'borderless'>${waterArray[j]}</td>`;
      }else if( ( waterArray[j] > 0 ) && ( i > max - waterArray[j] ) ){
        content += `<td class= 'water'></td>`;
      }else{
        content += `<td></td>`;
      }
    }
    content += "</tr>";
  }
  content += "</tbody></table>";

  document.getElementById("result").innerHTML = content;
}
