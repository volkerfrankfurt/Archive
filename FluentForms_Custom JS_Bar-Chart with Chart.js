// Put the following js into Fluent Forms Custom JS Field (individuall per each form!)
// This js Relates field Names to The current form.
////////////////////////////////////////////////////////////////////
// You need to   
// - MANUALLY ADJUST the field names / Form ID in line 67-69
// - Put the following in HTML Field: 
//    <div id="html--chart"></div>
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// Use PHP Snippet to activate Chart.js
///////////////////////////////////////////////////////////////////
/*
add_action('fluentform/load_form_assets', function($formId) {
    $allowedFormIds = array(54, 55); // Add relevant Form IDs here

    if (in_array($formId, $allowedFormIds)) {
        // Load Chartjs Libary
        wp_register_script( 'canvasJS', 'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js', null, null, true );
        wp_enqueue_script('canvasJS');
    }
}, 10, 1);
*/
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


jQuery(document).ready(function($) {
  // html--chart needs to be referenced in FF Custom HTML Field in Form Editor
  $("#html--chart").append('<canvas id="densityChart" width="500" height="300"></canvas>');
  
  window.ff_scroll_top_offset = 20;
  const densityCanvas = document.getElementById("densityChart");
  
  // Updated defaults
  Chart.defaults.set('font', {
    size: 17
  });
  Chart.defaults.set('color', 'black');
  Chart.defaults.set('plugins.tooltip.enabled', false);
  
  let densityData = {
    label: "Sources of Motivation",
    data: [500, 500, 500],
    backgroundColor: [
      'rgba(23, 112, 207, 1)',    //  Blue #1770CF
      'rgba(163, 0, 0, 1)',       //  Dark Red #A30000
      'rgba(0, 132, 26, 1)',      //  Green #A30000
    ],
    borderColor: 'rgba(96, 96, 96, 0.4)',
    borderWidth: 3,
    hoverBorderWidth: 3,
    hoverBorderColor: 'rgba(96, 96, 96, 0.6)',
  };
  
  let barChart = new Chart(densityCanvas, {
    type: "bar",
    data: {
      labels: ["Achievement","Power","Affiliation"],
      datasets: [densityData]
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          beginAtZero: true
        }
      },
      elements: {
        bar: {
          barPercentage: 1.1
        }
      }
    }
  });
  
  function addData(chart) {

    ourValue1 = jQuery("#ff_54_SumAchievement").val();
    ourValue2 = jQuery("#ff_54_SumPower").val();
    ourValue3 = jQuery("#ff_54_SumAffiliation").val();

    console.log(ourValue1);
    console.log(ourValue2);
    console.log(ourValue3);
    chart.data.datasets[0].data = [ourValue1, ourValue2, ourValue3];
    chart.update();
  }
  
  jQuery(".ff-btn-next").click(function(){
    addData(barChart);
  });
});
