<?php 
	header ("Access-Control-Allow-Origin: *");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	header ("Access-Control-Allow-Headers: *");
?>

<div class="event-content">
	<div class="event-nav">
		<p id="all-event-title">List of Events</p>
		<p id="request-event-title">Request Events</p>
	</div>

	<div class="all-event-container"><br>
		<table>
			<thead>
				<tr>
					<th width="5%">#</th>
					<th width="50%">Theme</th>
					<th width="25%">Ministry</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody id="event-list"></tbody>
		</table>
	</div>

	<div class="request-event-container">
		<div class="requestPanel" id="request-list"></div>
	</div>
</div>

<b style="display:none;" id="eventMonth"></b>
<b style="display:none;" id="eventYear"></b>
<div id="view-calendar" style="display:none;"></div>
<div id="displayEvent" style="display:none;"></div>
<div id="previous-event-wrapper" style="display:none;"></div>