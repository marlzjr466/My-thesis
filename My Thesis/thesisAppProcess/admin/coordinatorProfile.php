<?php 
	header ("Access-Control-Allow-Origin: *");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	header ("Access-Control-Allow-Headers: *");
?>

<div class="myprofile-content">
	<div class="profile-left-container">
		<div class="profile-container">
			<div class="cover-photo">
				<img id="cover-photo">
			</div>

			<div class="profile-nav">
				<div class="profile-pic-wrapper">
					<img id="profile-pic">
				</div>

				<div class="info">
					<p class="myname" id="myname"></p>
				</div>

				<div class="info-two">
					<p>
						<span>POSITION</span><br>
						<b id="myposition"></b>
					</p>

					<p>
						<span>GENDER</span><br>
						<b id="mygender"></b>
					</p>

					<p>
						<span>CONTACT NO.</span><br>
						<b id="mycontact"></b>
					</p>
				</div>
			</div>

			<div class="profile-body">
				<div class="info-wrapper">
					<p>
						<span>
							<img src="../images/icon/calendar.png">
						</span>
						<label id="mybday"></label>
					</p>
					<label class="title">Birthday</label>
				</div> <br>

				<div class="info-wrapper">
					<p>
						<span>
							<img src="../images/icon/home.png">
						</span>
						<label id="myadd"></label>
					</p>
					<label class="title">Address</label>
				</div> <br>
			</div>
		</div>
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


