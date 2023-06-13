<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scalre=1.0">
	<meta name="X-UA-Compatible" content="ie=edge">
	<title>Ticket History</title>

	<style>
		        .table-products {
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

        .table-products tbody tr:last-child {
            background-color: #f1f5f8;
        }

        .table-products .sc-item {
            font-size: 14px;
            font-style: italic;
            color: #3D4852;
        }

        .table-products > tbody > tr:nth-child(even) {
            background-color: #EDF2F7;
        }

        .table-products > tbody > tr:nth-child(odd) {
            background-color: white;
        }
	</style>
</head>
    <body>
		<div class="flex flex-col gap-3 w-10/12">
			<h2>Ticket History Report</h2>

			<table class="table-products">
				{{-- <tr style="background-color: #9fe3de; color: #404040" >
					<th></th>
					<th width="40px">RoomNo</th>
					<th width="40px">FloorNo</th>
					<th>RoomType</th>
					<th width="200px">Description</th>
					<th width="100px">RoomStatus</th>
				</tr> --}}
				<tr>
					<td style="width: 30%, background-color: rgb(203 213 225)">
						Ticket No.
					</td>
					<td style="background-color: lightskyblue">
						23060080
					</td>
				</tr>
				<tr>
					<td style="width: 40%, background-color: rgb(203 213 225)">
						Ticket Title
					</td>
					<td style="background-color: lightskyblue">
						We are here to help
					</td>

				</tr>
				<tr>
					<td style="width: 40%, background-color: rgb(203 213 225)">
						Requestor Name
					</td>
					<td style="background-color: lightskyblue">
						23060080
					</td>

				</tr>
				<tr>
					<td style="width: 40%, background-color: rgb(203 213 225)">
						Requestor Email
					</td>
					<td style="background-color: lightskyblue">
						23060080
					</td>
				</tr>

	
			</table>

	</body>
</html>