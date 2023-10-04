<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scalre=1.0">
	<meta name="X-UA-Compatible" content="ie=edge">
	<title>Ticket History</title>

	<style>
		body {
			font-family: 'Open Sans', sans-serif;
            max-width: 95%;
            margin-left: auto;
            margin-right: auto;
		}

        .row:after {
            content: "";
            display: table;
            clear: both;
        }

        /* Create two equal columns that floats next to each other */
        .column {
        float: left;
        width: 50%;
        padding: 10px;
        height: 100px;
        }

        .left {
            float: left;
        }

        .right {
            float: right;
        }

		.item-container {
            margin-top: 1rem;
            border: 1px rgb(173, 172, 172) solid;
            width: 45%;
            min-height: 100px;
            padding: 10px 10px;
		}

        .item-container-sm {
            margin-top: 1rem;
            border: 1px rgb(173, 172, 172) solid;
            width: 40%;
            min-height: 100px;
            padding: 10px 10px;
		}

        .sub-container {
            max-width: 50%;
            padding: 5px 5px;
        }

        .ticket-no {
            text-align: center;
            font-weight: 600;
            font-size: 1.1rem;
        }

        .ml-1 {
            margin-left: 5px; 
        }

        .ml-2 {
            margin-left: 1rem;
        }

        .mt-2 {
            margin-top: 1rem;
        }

        .min-h-100 {
            min-height: 100px;
        }

        .min-h-300 {
            min-height: 300px;
        }

        .item-container-full {
            margin-top: 1rem;
            border: 1px rgb(173, 172, 172) solid;
            border-radius: 5px;
            padding: 10px 10px;
        }

        .d-flex {
            display: -webkit-box; /* wkhtmltopdf uses this one for flexbox */
    		-webkit-box-pack: start; /* wkhtmltopdf uses this one */
			-webkit-box-align: center;

        }

        .mt--1 {
            margin-top: -2px;
        }

        .mt-1 {
            margin-top: 5px
        }

        .w-full {
            width: 100% !important;
        }

		.header {
			display: -webkit-box; /* wkhtmltopdf uses this one for flexbox */
    		-webkit-box-pack: center; /* wkhtmltopdf uses this one */
			-webkit-box-align: center;

			display: flex;
			column-gap: 5px;
			padding: 10px;

			border-bottom: 1.5px solid #a5832b;
		}

        .header-title {
            font-size: 2.2rem;
            font-family: 'Courier New', Courier, monospace; 
        }
		
		.logo {
			width: 100px;
			height: 100px;
		}

        .footer {
            margin-top: 2rem;
            font-weight: 600;
            text-align: center;
            font-family: sans-serif;
        }

		.page-break {
			page-break-after: always;

		}

	</style>
</head>
    <body>
		<div >
			<div class='header'>
                <img src="{!! public_path('images/logo.jpg') !!}" class="logo"/>
				
                <div class="d-flex-row ml-2">
                    <h2 class="header-title" style="margin-bottom: 4px">
                        MAG CONSULTING PTE LTD
                    </h2>
                    <hr>
                    <h3 style="margin-top: -4px; font-style:italic">INFORMATION TECHNOLOGY SPECIALIST</h3>
                </div>
			</div>

            <div class="row">
                <div class="item-container left">
                    <div class="sub-container left">                    
                        <p>Company Name:</p>
                        <p>PIC:</p>
                        <p>Email:</p>
                        <p>Contact:</p>
                    </div>
                    <div class="sub-container left">
                        <p>{{$company}}</p>
                        <p>{{$picName}}</p>
                        <p>{{$email}} </p>
                        <p>{{$contact}}</p>
                    </div>
                </div>

                <div class="item-container right">
                    <div class="sub-container left mt--1">                    
                        <p>Date:</p>
                        <p>Time:</p>
                        <p>Customer ID:</p>
                        <p>Engineer:</p>
                    </div>
                    <div class="sub-container left mt--1">
                        <p>{{$Date}}</p>
                        <p>{{$time}} </p>
                        <p>{{$customerId}}</p>
                        <p>{{$engineer}}</p>
                    </div>
                </div>
            </div>

            <div class="item-container-full d-flex">
                <p>Service Type: </p>
                <div class="ml-2 d-flex">
                    <p>Service Order</p>
                    @if ($service)
                        <input type="checkbox" checked class="ml-1"/>
                    @else
                        <input type="checkbox" class="ml-1"/>
                    @endif 
                    
                </div>
                <div class="ml-2 d-flex">
                    <p>Job Order</p>
                    @if ($workOrder)
                        <input type="checkbox" checked class="ml-1"/>
                    @else
                        <input type="checkbox" class="ml-1"/>
                    @endif 
                </div>
                <div class="ml-2 d-flex">
                    <p>Others</p>
                    @if ($others)
                        <input type="checkbox" checked class="ml-1"/>
                    @else
                        <input type="checkbox" class="ml-1"/>
                    @endif 
                </div>
                <p class="ml-2">{{$othersText}}</p>
            </div>


            <h3 class="ticket-no">Ticket No: {{$ticketId}}</h3>

            <p class="mt-2">Problem</p>
            <div class="item-container-full min-h-100">
                    {!! $problem !!}
            </div>

            <p class="mt-2">Details</p>
            <div class="item-container-full min-h-300">
                {!! $detail !!}
            </div>

            <div class="d-flex row">
                <p>Requestor Name:</p>
                <p class="ml-1">{{$requestorName}}</p>
            </div>

            <div class="row">
                <div class="item-container-sm left">
                    <img src="{!! public_path("/storage/$imageURL") !!}" class="logo"/>
                </div>
                
                <div class="item-container-sm right">
                    <div class="d-flex">
                        @if ($maintenancePlan)
                            <input type="checkbox" checked class="ml-1"/>
                        @else
                            <input type="checkbox" class="ml-1"/>
                        @endif 
                        <div class="ml-1">Maintenance Plan</div>
                    </div>

                    <div class="d-flex mt-2">
                        @if ($adHoc)
                            <input type="checkbox" checked class="ml-1"/>
                        @else
                            <input type="checkbox" class="ml-1"/>
                        @endif 
                        <div class="d-flex ml-1">Ad Hoc: S$ {{$adHocFee}}</div>

                    </div>
                </div>

            </div>

            <div class="footer">Quality, Commitment and Efficiency Shall Be Our Hallmarks For Success</div>
		</div>

	</body>
</html>