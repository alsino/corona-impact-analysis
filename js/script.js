const CWIDTH = 550;
const CHEIGHT = 300;

const COLORS = {
  "data1": '#00CBDB',
  "data2": "#F76906",
  "data3": "#FFBB00",
  "data4": "#57C494"
}

let chart1Data =  ['data1', 300, 350, 300, 600, 200, 150, 340, 260, 200, 300];
let chart1DataNew = ['data1', 100, 250, 400, 70, 90, 310, 240, 560, 300, 400];

let chart2Data = {
  "s": ['data1', 300, 350, 300, 600, 200, 150, 340, 260, 200, 300],
  "e": ['data2', 100, 250, 400, 70, 90, 310, 240, 560, 300, 400],
  "I_combined": ['data3', 40, 30, 60, 120, 340, 170, 20, 20, 90, 70],
  "R_combined": ['data4', 30, 35, 230, 70, 80, 50, 130, 60, 70, 180],
}

let chart2DataNew = {
  "s": ['data1', 30, 35, 230, 70, 80, 50, 130, 60, 70, 180],
  "e": ['data2', 300, 350, 300, 600, 200, 150, 340, 260, 200, 300],
  "I_combined": ['data3', 380, 220, 110, 230, 30, 70, 320, 60, 120, 80],
  "R_combined": ['data4', 100, 250, 400, 70, 90, 310, 240, 560, 300, 400],
}

let chart1 = c3.generate({
  bindto: '#chart-1',
  size: {
    width: CWIDTH,
  },
  tooltip: {
    grouped: true
  },
  data: {
      columns: [chart1Data],
      types: {
          data1: 'step'
      },
      names: {
        data1: 'Policy Strength'
      },
      colors: COLORS
  },
  axis: {
    x: {
      type: "category",
      categories: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  },
  // legend: {
  //   position: 'inset'
  // }
});

let chart2 = c3.generate({
  bindto: '#chart-2',
  size: {
    width: CWIDTH
  },
  data: {
    columns: [
      chart2Data["s"],
      chart2Data["e"],
      chart2Data["I_combined"],
      chart2Data["R_combined"],
    ],
    type: 'spline',
    names: {
      data1: 'S',
      data2: 'E',
      data3: "I_combined",
      data4: "R_combined"
    },
    colors: COLORS
  },
  axis: {
    x: {
      type: "category",
      categories: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  },
  // legend: {
  //   position: 'inset'
  // }
});



let slider = document.getElementById("pc");
let output = document.getElementById("slider-1-value");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  console.log(slider.value);
  // console.log(dataDefaultLoaded);
  loadData();
  output.innerHTML = this.value;
}


function loadData(){
  let loadTime = 0;

  if(slider.value < 50) {

    // chart 1
    setTimeout(()=>{
        chart1.load({
          columns: [chart1Data]
        });
    },loadTime)

    // chart 2
    setTimeout(()=>{
      chart2.load({
        columns: [
          chart2Data["s"],
          chart2Data["e"],
          chart2Data["I_combined"],
          chart2Data["R_combined"],
        ]
      });
    },loadTime)

  } else {

    // chart 1
    setTimeout(()=>{
        chart1.load({
          columns: [chart1DataNew]
        });
    },loadTime)

    // chart 2
    setTimeout(()=>{
      chart2.load({
        columns: [
          chart2DataNew["s"],
          chart2DataNew["e"],
          chart2DataNew["I_combined"],
          chart2DataNew["R_combined"],
        ]
      });
    },loadTime)






  }
}


