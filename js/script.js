$(document).ready(function(){

	var chart;
	var xmove = 200;
	var ymove = 300;
	var opened = false;
	var year = 2001;
	var categorie = null;

	function setContentIndice()
	{
		$('#content').css({
			backgroundImage: 'url("images/indices/indice_'+year+'.jpg")',
		});
	}

    chart = new Highcharts.Chart({
	        chart: {
	            renderTo: 'graphic',
	            type: 'line',
	            events: {
            		load: function(event) {
						$('.graphdate').click(function(e){
							year = e.target.id;
							if (!opened)
								setContentIndice();
							else
								closeMachine();
							$('.curDate').removeClass('curDate');
							$('#'+e.target.id).addClass('curDate');
						});
		            }
		        },
		        borderRadius:0
	        },
	        title: {
	            style: {
	            	display: 'none'
	            }
	        },
	        xAxis: {
	            categories: ['2001', '2002', '2003', '2004', '2005', '2006',
	                '2007', '2008'],
	            lineWidth: 2,
	            lineColor: '#9d9ea0',
	            tickLength: 130,
	            tickPosition: 'inside',
	            tickmarkPlacement: 'on',
	            tickColor: '#d5d5d7',
	            labels: {
	            	style:{
	            		color: '#bc0926'
	            	},
		            useHTML: true,
		            y: 8,
		            x: 2,
		            formatter: function()
		            {
		            	return '<img src="images/point.png"/><br/><a id="'+this.value+'" href="#" class="graphdate">'+ this.value+'</a>';
		            }
	            }
	        },
	        yAxis: {
	            title: {
	                text: 'ISS',
	                style: {
	                	color: '#9c9d9f'
	                },
	                rotation: 0,
	                align: 'high',
	            },
	            lineWidth: 2,
	            lineColor: '#9d9ea0',
	           	gridLineWidth: 0
	        },
	        tooltip: {
	            crosshairs: true,
	            shared: true
	        },
	        plotOptions: {
	            line: {
	                marker: {
	                    radius: 0,
	                    lineColor: '#666666',
	                    lineWidth: 1
	                }
	            }
	        },
	        legend : {
				enabled: false
			},
	        credits : {
				enabled: false
			},
	        series: [{
	            name: 'France',
	            data: [50, 51, 45, 49, 47, 56, 56, 60],
	            color: '#bc0926'

	        }, {
	            name: 'Gironde',
	            data: [53, 64, 63, 59, 41, 43, 58, 61],
	            color: '#0c71b5'
	        }]
	    });

	    function setDate()
	    {
	    	//alert(94);
	    	$('#date').css({
	    		backgroundImage: 'url("images/vignettes/'+categorie+'.png")',
	    		backgroundPosition: -((year - 2001) * 114)+'px'
	    	});

	    }

		function openMachine()
		{
			if (opened)
				return;
			$('#content').css({
				backgroundImage: 'none',
				backgroundColor: '#FFFFFF'
			});
			$('#page').css({
				backgroundImage: 'url(\'images/pages/' + categorie + '_' + year + '.jpg\')'
			});
			setDate();
			$('#definition').attr('href', 'images/definitions/'+categorie+'.jpg');
			$('#sante').animate({
				top: '+=-'+xmove,
				left: '+=-'+ymove
			});
			$('#logement').animate({
				top: '+=-'+xmove,
				left: '+='+ymove
			});
			$('#money').animate({
				top: '+='+xmove,
				right: '+=-'+ymove
			});
			$('#emploi').animate({
				top: '+='+xmove,
				right: '+='+ymove
			});
			$('#content').animate({
				left: '-='+(xmove - 200),
				top: '-='+(ymove/2+75),
				width: '+='+xmove*3,
				height: '+='+(ymove+150)
			}, 400, function() {
		 		$('.inside').fadeIn(200);
		 		$('#footer').css('margin-top', '-400px');
		 	});
			opened = true;
		}

		function closeMachine()
		{
			if (!opened)
				return;
			$('#footer').css('margin-top', '200px');
			$('.current').removeClass('current');
			$('.inside').hide();
			$('#sante').animate({
				top: '+='+xmove,
				left: '+='+ymove
			});
			$('#logement').animate({
				top: '+='+xmove,
				left: '+=-'+ymove
			});
			$('#money').animate({
				top: '+=-'+xmove,
				right: '+='+ymove
			});
			$('#emploi').animate({
				top: '+=-'+xmove,
				right: '+=-'+ymove
			});
			$('#content').animate({
				left: '+='+(xmove - 200),
				top: '+='+(ymove/2+75),
				width: '-='+xmove*3,
				height: '-='+(ymove+150)
			}, 400, function (){
				setContentIndice();
			});

			opened = false;
		}

		function toggleMachine()
		{
			if (opened)
				closeMachine();
			else
				openMachine();
			
		}

		var openedGraphic = true;
		function toogleGraphic(callback)
		{
			$('#graphic').slideToggle("slow", callback);
			if (openedGraphic)
			{
				$('#showhide').css({
					'background-position': '38px',
					'left': '484px'
				});
				$('#clickyear').hide();
			}
			else
			{
				$('#showhide').css({
					'background-position': '0px',
					'left': '234px'
				});
				$('#clickyear').show();
			}
			openedGraphic = !openedGraphic;
		}

	$('.element').click(function(e) {
		categorie = e.target.id;
		if (opened)
		{
			closeMachine();
			setTimeout(openMachine, 800);
		}
		else if (openedGraphic)
			toogleGraphic(openMachine)
		else
			openMachine();
			
		$('#'+e.target.id).addClass('current');
	});

	$('#showhide').click(function(){
		toogleGraphic();
	});

	$("div#definition").fancybox();
	$("div#issdefinition").fancybox();
});
