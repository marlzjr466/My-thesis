<?php 
	header ("Access-Control-Allow-Origin: *");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	header ("Access-Control-Allow-Headers: *");
?>

<div class="reports-content">
	<div class="reports-left-container">
		<h3>ANNUAL REPORTS HERE....</h3>
	</div>

	<div class="right-container">
		<label>Event calendar</label> <br>
		<hr>
		<div class="event-calendar-wrapper">
			<div class="event-calendar-month-year">
				<div id="prev-img" onclick="calendarEvent('prev')">
					<img src="../images/logo/prev.png">
				</div>

				<div id="center">
					<b id="eventMonth"></b> 
					&nbsp; <div id="sep"></div> &nbsp;
					<b style="color: rgba(0,0,0,.4)" id="eventYear"></b>
				</div>

				<div id="next-img" onclick="calendarEvent('next')">
					<img src="../images/logo/next.png">
				</div>
			</div>

			<table>
				<thead>
					<tr>
						<th>SUN</th>
						<th>MON</th>
						<th>TUE</th>
						<th>WED</th>
						<th>THU</th>
						<th>FRI</th>
						<th>SAT</th>
					</tr>
				</thead>
				<tbody id="view-calendar"></tbody>
			</table>

			<div class="wrap-event">
				<table>
					<tbody id="displayEvent"></tbody>
				</table>
			</div>
		</div>
		<div class="event-indicator-wrapper">
			<div id="indicator">
				<div id="previous"></div> <p>Previous Event</p>
			</div>

			<div id="indicator">
				<div id="ongoing"></div> <p>Ongoing Event</p>
			</div>

			<div id="indicator">
				<div id="upcoming"></div> <p>Upcoming Event</p>
			</div>
		</div> <br><br>	

		<label>Coordinators</label>
		<button class="addCoordinator" onclick="addCoordinatorModal()">&plus;Add Coordinator</button><br>
		<hr>

		<div id="coordinator-list"></div>
	</div>
</div>

<div id="event-list" style="display: none"></div>
<div id="request-list" style="display: none"></div>
<div id="active-event-wrapper" style="display: none"></div>
<div id="previous-event-wrapper" style="display: none"></div>


