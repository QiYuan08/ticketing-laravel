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
		}

		.container {
			width: 98%;
			margin-left: auto;
			margin-right: auto;
		}

		.header {
			display: -webkit-box; /* wkhtmltopdf uses this one for flexbox */
    		-webkit-box-pack: start; /* wkhtmltopdf uses this one */
			-webkit-box-align: center;

			display: flex;
			column-gap: 5px;
			padding: 10px;

			border-bottom: 1.5px solid #a5832b;
		}
		
		.logo {
			width: 100px;
			height: 100px;
		}

		.table-products {
			margin-top: 15px;
			table-layout: fixed;
            width: 100%;
            border:none;
            outline:none;
            -webkit-backface-visibility: hidden;
            font-size: 18px;
        }

        .table-products thead tr {
            background-color: #0A3D8A;
            color: #FFFFFF;
        }

        .table-products thead tr th {
            padding: 5px 10px;
            border:none;
            outline:none;
        }

        .table-products tbody tr {
            border:none;
            outline:none;
        }

        .table-products tbody tr td {
            padding: 3px 3px;
            border:none;
            outline:none;
            -webkit-backface-visibility: hidden;
        }

        .table-products tbody {
            background-color: #e2dede;
        }

        .table-products .sc-item {
            font-size: 14px;
            font-style: italic;
            color: #3D4852;
        }

        /* .table-products > tbody > tr:nth-child(even) {
            background-color: #EDF2F7;
        }

        .table-products > tbody > tr:nth-child(odd) {
            background-color: white;
        } */

		.ticket {
		}

		.messages_cotainer {
			width: 100%;
			padding: 5px;
			margin-top: 20px;
		}

		.messages_header {
			display: -webkit-box; /* wkhtmltopdf uses this one for flexbox */
    		-webkit-box-pack: end; /* wkhtmltopdf uses this one */

			background-color: #e8d69a;
			font-weight: 500;
			padding-left: 10px;
			padding-right: 10px;
		}

		.messages_header > :first-child {
			padding-right: 6px;
			border-right: 1px solid gray;
		}

		.messages_header > :last-child {
			padding-left: 6px;
		}

		.messages_body {
			display: -webkit-box; /* wkhtmltopdf uses this one for flexbox */
    		-webkit-box-pack: end; /* wkhtmltopdf uses this one */
			box-orient: horizontal;

			padding-left: 10px;
			padding-right: 10px;
			margin-top: 5px;
			background-color: #fafacd;
		}

		.page-break {
			page-break-after: always;

		}

	</style>
</head>
    <body>
		<div class='container'>
			<div class='header'>
				<div class="company">
					<img src="{!! public_path('images/logo.jpg') !!}" class="logo"/>
				</div>
				<h3>MAG - IT Support</h3>
			</div>
			<h2>{{$requestor}} - Ticket History Report</h2>
			
			<p style="padding-bottom: 0px, margin-bottom: 0px">
				System: Admin - MAGIT
			</p>
			<p style="margin-top: 0px, padding-top: 0px">
				Printed on: {{$date}}
			</p>

			@foreach ($tickets as $ticket)
				<table class="table-products">
					<tr>
						<td style="width: 30%">
							Ticket No.
						</td>
						<td style="background-color: #e2f0f9">
							{{$ticket['ticket_id']}}
						</td>
					</tr>
					<tr>
						<td style="width: 30%">
							Requested on
						</td>
						<td style="background-color: #e2f0f9">
							{{$ticket['created_at']}}
						</td>
					</tr>
					<tr>
						<td style="width: 30%">
							Ticket Title
						</td>
						<td style="background-color: #e2f0f9">
							{{$ticket['subject']}}
						</td>

					</tr>
					<tr>
						<td style="width: 30%">
							Requestor Name
						</td>
						<td style="background-color: #e2f0f9">
							{{$ticket['requestor']['pic_name']}}
						</td>

					</tr>
					<tr>
						<td style="width: 30%">
							Requestor email
						</td>
						<td style="background-color: #e2f0f9">
							{{$ticket['requestor']['email']}}
						</td>
					</tr>
					<tr>
						<td style="width: 30%">
							Ticket status
						</td>
						<td style="background-color: #e2f0f9">
							{{$ticket['status']['name']}}
						</td>
					</tr>
				</table>

				<div class="ticket">
					@foreach ($ticket['messages'] as $message) 
						<div class="messages_cotainer">
							<div class="messages_header">
								<p>{{$message['created_at']}}</p>
								<p>
									{{$message['sender']['pic_name'] ?? $message['sender']['name']}} ({{$message['sender']['email'] ?? $message['sender']['email']}})
								</p>
								</div>
							<div class="messages_body">
								{!! $message['payload'] !!}
								<p>fdafdsfasdf</p>
								<p>asdfhfjnbfg</p>
							</div>
						</div>
						
					@endforeach
				</div>

				<div class='page-break'></div>
			@endforeach

		</div>

	</body>
</html>