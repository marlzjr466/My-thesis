<?php 
	header ("Access-Control-Allow-Origin: *");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	header ("Access-Control-Allow-Headers: *");
?>

<div class="event-content">
	<div class="event-nav">
		<p id="all-event-title">List of Events</p>
		<p id="request-event-title">Create Event</p>
	</div>

	<div class="all-event-container"><br>
		<select id="select-event-type" onchange="getEventType(this.value)">
			<option value="">Choose event here</option>
			<option value="All">All events</option>
			<option value="Proposed">Proposed events</option>
			<option value="Approved">Approved events</option>
		</select> <br>
		<table>
			<thead>
				<tr>
					<th width="5%">#</th>
					<th width="45%">Theme</th>
					<th width="25%">Ministry</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody id="event-list"></tbody>
		</table>
	</div>
	<div class="add-event-container"> <br>
		<div class="add-event-image-wrapper">
			<img id="event-img">
		</div>
		<input type="hidden" id="eventID">
		<div class="add-event-date-wrapper">
			<label>Date start:</label> <br>
			<input type="date" id="start-date">

			<label>Date End:</label> <br>
			<input type="date" id="end-date">
		</div>

		<input type="file" id="add-event-image" onchange="loadFileEvent(event) || angular.element(this).scope().fileSelected(this)"> <br>
		<label>Registration Fee:</label> <br>
		<input type="text" id="add-event-fee" placeholder="Input here...">

		<label>Theme of the event:</label> <br>
		<input type="text" id="add-event-theme" placeholder="Input here...">

		<label>Venue of the event:</label> <br>
		<input type="text" id="add-event-venue" placeholder="Input here...">

		<label>Speaker of the event:</label> <br>
		<input type="text" id="add-event-speaker" placeholder="Input here...">

		<label>Select host for the event:</label> <br>
		<select id="select-event-church"></select>

		<label>Select Ministry:</label> <br>
		<select id="select-event-ministry"></select>

		<button onclick="addEvent()" id="add-event-btn">CREATE</button>
	</div>
</div>

<b style="display:none;" id="eventMonth"></b>
<b style="display:none;" id="eventYear"></b>
<div id="view-calendar" style="display:none;"></div>
<div id="displayEvent" style="display:none;"></div>
<div id="previous-event-wrapper" style="display:none;"></div>
<div id="request-list" style="display:none;"></div>
<div id="register-church-delegate" style="display:none;"></div>
<div id="register-church-delegate2" style="display:none;"></div>
<div id="count-pending-delegates" style="display:none;"></div>
<div id="pending-delegates" style="display:none;"></div>