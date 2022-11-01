//gives info about tasks
tracking = {
    
    loadtable : function(){
        var tableData = [
            {task:'Mock Design implementation for a contact form',estimate:'12 hours',developers:'2'},
             {task:'UI Screen implementation for a website',estimate:'8 hours',developers:'1'},
             {task:'API integration for a contact form',estimate:'20 hours',developers:'2'}
        ]
        var txt ="";
        if(tableData.length > 0){
                    for(var i=0;i<tableData.length;i++){
                            txt += "<tr><td>"+(i+1)+"</td><td>"+tableData[i].task+"</td><td>"+tableData[i].estimate+"</td>"+ "<td>"+tableData[i].developers+"</td>"+"<td><button id='editData'  type='button' rel='tooltip' title='View Task' class='btn btn-info btn-simple btn-link'><i class='fa fa-eye'></i></button</td></tr>";
                        }
        }
         $("#tableTasks tbody").append(txt);
    },

    initDashboardPageCharts: function() {

        var data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            series: [
                [30, 10, 20, 10, 10, 10, 10],
                 [20, 5, 10, 7, 8, 5, 3]
            ]
        };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }]
        ];

        var chartActivity = Chartist.Line('#chartActivity', data, options, responsiveOptions);
    }
}

$(document).ready(function() {
    $sidebar = $('.sidebar');
    $sidebar_img_container = $sidebar.find('.sidebar-background');

    $full_page = $('.full-page');
    tracking.initDashboardPageCharts();
    tracking.loadtable();

    editbtn = $('#btnEditBarChart');
    console.log(editbtn,'heelo');
    
    $('#btnEditBarChart').click(function(){
        var dataPreferences = {
            series: [
                [30, 10, 20, 10, 10, 10, 10],
                 [20, 5, 10, 7, 8, 5, 3]
            ]
        };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        Chartist.Bar('#chartActivity', dataPreferences, options);

        Chartist.Bar('#chartActivity', {
           labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            series: [
                    [30, 10, 20, 10, 10, 10, 10],
                 [20, 5, 10, 7, 8, 5, 3]
            ]
        });

    });
    
    $('#btnEditLineChart').click(function(){
       tracking.initDashboardPageCharts();
    });
    
    $sidebar_responsive = $('body > .navbar-collapse');

    window_width = $(window).width();

    fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

    if (window_width > 767 && fixed_plugin_open == 'Dashboard') {
        if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
            $('.fixed-plugin .dropdown').addClass('show');
        }

    }
    
    $("#tableTasks").on("click","button.btn",function() {
      var row = $(this).closest('tr');
      var columns = row.find('td');
       sessionStorage.taskData='';
         let data = {};
         let values =''
        $.each(columns, function(i, item) {
            values = values + 'td' + (i + 1) + ':' + item.innerHTML + '<br/>';
        });
             let obj = values.split('<br/>');
             data.taskName = obj[1].split(':')[1];
             data.estimate = obj[2].split(':')[1];
             data.developers = obj[3].split(':')[1];
             sessionStorage.taskData=data;
         
         $('#taskName').val(data.taskName);
         $('#estimate').val(data.estimate);
         $('#developers').val(data.developers);
         $('#editModal').modal('show');
                 console.log(values.split('<br/>'));  
    });
    $('.fixed-plugin a').click(function(event) {
        // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
        if ($(this).hasClass('switch-trigger')) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
        }
    });

    $('.fixed-plugin .background-color span').click(function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var new_color = $(this).data('color');

        if ($sidebar.length != 0) {
            $sidebar.attr('data-color', new_color);
        }

        if ($full_page.length != 0) {
            $full_page.attr('filter-color', new_color);
        }

        if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.attr('data-color', new_color);
        }
    });

    $('.fixed-plugin .img-holder').click(function() {
        $full_page_background = $('.full-page-background');

        $(this).parent('li').siblings().removeClass('active');
        $(this).parent('li').addClass('active');


        var new_image = $(this).find("img").attr('src');

        if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            $sidebar_img_container.fadeOut('fast', function() {
                $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                $sidebar_img_container.fadeIn('fast');
            });
        }

        if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $full_page_background.fadeOut('fast', function() {
                $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
                $full_page_background.fadeIn('fast');
            });
        }

        if ($('.switch-sidebar-image input:checked').length == 0) {
            var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
            $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
        }

        if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
        }
    });

    $('.switch input').on("switchChange.bootstrapSwitch", function() {

        $full_page_background = $('.full-page-background');

        $input = $(this);

        if ($input.is(':checked')) {
            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeIn('fast');
                $sidebar.attr('data-image', '#');
            }

            if ($full_page_background.length != 0) {
                $full_page_background.fadeIn('fast');
                $full_page.attr('data-image', '#');
            }

            background_image = true;
        } else {
            if ($sidebar_img_container.length != 0) {
                $sidebar.removeAttr('data-image');
                $sidebar_img_container.fadeOut('fast');
            }

            if ($full_page_background.length != 0) {
                $full_page.removeAttr('data-image', '#');
                $full_page_background.fadeOut('fast');
            }

            background_image = false;
        }
    });
});

type = ['primary', 'info', 'success', 'warning', 'danger'];