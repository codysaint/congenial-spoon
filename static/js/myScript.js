$(document).ready(function () {
    var previewURL = "http://127.0.0.1:5000/preview";
    var predictURL = "http://127.0.0.1:5000/predict";
    var dataURL;
    var extension;
    
    $('#loader').hide();
	$('#divTablePreview').hide();
    $('#loader_predict').hide();
	$('#divTablePredict').hide();
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // $('img').on('click', function () {
    //     var image = $(this).attr('src');
	// 		$('#myModal').on('show.bs.modal', function () {
	// 			$(".img-responsive").attr("src", image);
	// 		});
	// 	});

		
	// browse file action
	$(document).on('click', '#fileBrowse', function(){
		var file = $(this).parent().parent().parent().find('.file');
		file.trigger('click');
	});
    
    // on change file action
	$(document).on('change', '.file', function(){
		$(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
		$('#buttonPreview').attr('disabled', false);
	});
	
	// on click of Preview button
	$(document).on('click', '#buttonPreview', function(){
        $('#loader').show();
		$('#tablePreviewBody').html("");
		$('#tablePreviewHeader').html("");

        var form_data = new FormData($('#upload-file')[0]);
        console.log('Form data : ',form_data)
        $.ajax({
            type: 'POST',
            url: previewURL,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                console.log(data)
                dataSummaryObj = data
                //console.log(data);
                $('#loader').hide();
                previewData(data['dataset'])
            }
        });         
	});
	

	// preview data
	function previewData(objArray)
      {
		console.log("\n ==== Preview Result ==== \n")
		$('#tablePreviewBody').html("");
		$('#tablePreviewHeader').html("");

		   var col_key = Object.keys(objArray[0])
		   console.log("col key: ", col_key);
		   $('#loader').hide();
		   console.log(col_key.length);
			
			
		   $('#tablePreviewHeader').append('<th><b>S.N.</b></th>');
		   for(j=0;j<col_key.length;j++)
		   {
			   $('#tablePreviewHeader').append('<th><b>'+col_key[j]+'</b></th>');
		   }
           for(var i=0; i<100; i++)
           {
                    /*$('#tablePreview').append('<tr><td><b>'+parseInt(i+1)+'</b></td><td>'+objArray[i][col_key[0]]+'</td><td>'+objArray[i][col_key[1]]+'</td><td>'+objArray[i][col_key[2]]+'</td><td>'+objArray[i][col_key[3]]+'</td><td>'+objArray[i][col_key[4]]+'</td><td>'+objArray[i][col_key[5]]+'</td><td>'+objArray[i][col_key[6]]+'</td><td>'+objArray[i][col_key[7]]+'</td><td>'+objArray[i][col_key[8]]+'</td><td>'+objArray[i][col_key[9]]+'</td><td>'+objArray[i][col_key[10]]+'</td><td>'+objArray[i][col_key[11]]+'</td><td>'+objArray[i][col_key[12]]+'</td><td>'+objArray[i][col_key[13]]+'</td><td>'+objArray[i][col_key[14]]+'</td><td>'+objArray[i][col_key[15]]+'</td><td>'+objArray[i][col_key[16]]+'</td><td>'+objArray[i][col_key[17]]+'</td><td>'+objArray[i][col_key[18]]+'</td><td>'+objArray[i][col_key[19]]+'</td><td>'+objArray[i][col_key[20]]+'</td></tr>');*/
				   var objArr_row ='';
				   var row_obj = objArray[i];
				   
				   for(j=0;j<col_key.length;j++)
				   {
					   console.log(objArray[i][col_key[j]]);
					   console.log(j);
					   console.log(col_key[j]);
					   
					   var row_val = row_obj[col_key[j]];
					   objArr_row = objArr_row + '<td>'+row_val+'</td>';
				   }
				   $('#tablePreviewBody').append('<tr><td><b>'+parseInt(i+1)+'</td>'+objArr_row+'</tr>');
           }
		    $('#divTablePreview').show();

		$('#tablePreview').excelTableFilter();

      };
    
	// on click of browse button for prediction
    $(document).on('click', '#browsePrediction', function(){
		var file = $(this).parent().parent().parent().find('.file');
		file.trigger('click');
		
	});
	
	// or on change
	$(document).on('change', '.file', function(){
		$(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
		$('#buttonPrediction').prop('disabled',false);
		
	});
	
	// on click of Prediction button
	$(document).on('click', '#buttonPrediction', function(){
        $('#loader_predict').show();
		$('#divTablePredict').show();
		$('#tablePredictBody').html("");
		$('#tablePredictHeader').html("");

        var form_data = new FormData($('#predict-file')[0]);
        console.log('Form data : ',form_data)
		
        $.ajax({
            type: 'POST',
            url: predictURL,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                console.log(data)
                dataSummaryObj = data
                //console.log(data);
                $('#loader_predict').hide();
                predictResult(data['predResult'])
            }
        });         
	});
	
	// $(document).on('click', '#showResult', function(){
	// 	$('#myModal').show();
	// });

	
	// show the prediction response from API in UI
    function predictResult(data)
	{ 
		console.log(" \n ==== Predict Result ==== \n ")
		$('#tablePredictBody').html("");
		$('#tablePredictHeader').html("");
		
		var col_key = Object.keys(data[0])
		console.log(data[0]);
		
		$('#tablePredictHeader').append('<th><b>S.N.</b></th>');
		   for(j=0;j<col_key.length;j++)
		   {
			   $('#tablePredictHeader').append('<th><b>'+col_key[j]+'</b></th>');
		   }
           for(var i=0; i<1000; i++)
           {
                    /*$('#tablePreview').append('<tr><td><b>'+parseInt(i+1)+'</b></td><td>'+objArray[i][col_key[0]]+'</td><td>'+objArray[i][col_key[1]]+'</td><td>'+objArray[i][col_key[2]]+'</td><td>'+objArray[i][col_key[3]]+'</td><td>'+objArray[i][col_key[4]]+'</td><td>'+objArray[i][col_key[5]]+'</td><td>'+objArray[i][col_key[6]]+'</td><td>'+objArray[i][col_key[7]]+'</td><td>'+objArray[i][col_key[8]]+'</td><td>'+objArray[i][col_key[9]]+'</td><td>'+objArray[i][col_key[10]]+'</td><td>'+objArray[i][col_key[11]]+'</td><td>'+objArray[i][col_key[12]]+'</td><td>'+objArray[i][col_key[13]]+'</td><td>'+objArray[i][col_key[14]]+'</td><td>'+objArray[i][col_key[15]]+'</td><td>'+objArray[i][col_key[16]]+'</td><td>'+objArray[i][col_key[17]]+'</td><td>'+objArray[i][col_key[18]]+'</td><td>'+objArray[i][col_key[19]]+'</td><td>'+objArray[i][col_key[20]]+'</td></tr>');*/
				   var objArr_row ='';
				   var row_obj = data[i];
				   
				   for(j=0;j<col_key.length;j++)
				   {
					   var row_val = row_obj[col_key[j]];
					   objArr_row = objArr_row + '<td>'+row_val+'</td>';
				   }
				   $('#tablePredictBody').append('<tr><td><b>'+parseInt(i+1)+'</td>'+objArr_row+'</tr>');
           }
		    $('#divTablePredict').show();

		$('#tablePredict').excelTableFilter();
		
		
    }
});