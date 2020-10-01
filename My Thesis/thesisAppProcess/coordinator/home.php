<?php 
	header ("Access-Control-Allow-Origin: *");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	header ("Access-Control-Allow-Headers: *");
?>

<div class="home-content">
	<!-- <div class="home-nav">
		<p>Welcome back <strong id="fname"></strong> </p>
	</div> -->

	<div class="left-container">
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

		<label>Ongoing event</label> <br>
		<hr>
		<div class="active-event-wrapper" id="active-event-wrapper"></div>

		<div class="active-event-program-wrapper" id="active-event-program-wrapper">
			<p>PROGRAMME</p> 
		</div>

		<label>Previous events</label> <br>
		<hr>
		<div class="previous-event-wrapper" id="previous-event-wrapper"></div>
		<div style="width: 100%; height: 50px; float: left;"></div>
	</div>

	
	<div class="right-container">
		<label>Registration for Active Event</label>
		<hr>
		
		<div class="registration-wrapper">
			<ul>
				<li class="active" onclick="registration('member')">Member</li>
				<li onclick="registration('visitor')">Visitor</li>
			</ul>

			<div class="member-registration-container">
				<p>Select church:</p> <br>
				<select id="register-church-delegate" onchange="getMembersByChurch(this.value);"></select> <br>

				<p>Delegates:</p> <br>
				<table>
					<thead>
						<tr>
							<th width="15%">No.</th>
							<th>Fullname</th>
							<th width="25%">Action</th>
						</tr>
					</thead>
					<tbody id="delegates-by-church">
						<tr>
							<td colspan="3">No data!</td>
						</tr>
					</tbody>
				</table> <br>

				<button onclick="registerDelegates()">Register</button>
				<img id="member-register-loader" src="../images/icon/loading.gif">
				<i id="member-register-success">Registered successfully! <strong>&check;</strong></i>
			</div>

			<div class="visitor-registration-container">
				<p>Select church:</p> <br>
				<select id="register-church-delegate2"></select> <br>

				<p>Visitor's fullname:</p> <br>
				<input id="visitor-fullname" type="text" placeholder="Enter here..."><br>

				<button onclick="registerVisitor()">Register</button>
				<img id="visitor-register-loader" src="../images/icon/loading.gif">
				<i id="visitor-register-success">Registered successfully! <strong>&check;</strong></i>
			</div>
		</div>

		<label>Pending registration for Active Event</label>
		<span id="count-pending-delegates">0</span>
		<hr>

		<div class="pending-registration-container">
			<p>Delegates:</p> <br>
			<table>
				<thead>
					<tr>
						<th width="15%">No.</th>
						<th>Fullname</th>
						<th width="25%">Action</th>
					</tr>
				</thead>
				<tbody id="pending-delegates">
					<tr>
						<td colspan="3">No data!</td>
					</tr>
				</tbody>
			</table> <br>

			<button onclick="registerPendingDelegates()">Register</button>
			<img id="pending-register-loader" src="../images/icon/loading.gif">
			<i id="pending-register-success">Registered successfully! <strong>&check;</strong></i>
		</div>

		<label>Add Expenses for Active Event</label>
		<hr>

		<div class="add-expenses-container">
			<input type="hidden" id="purchase-id">

			<p>Purchase items:</p> <br>
			<input type="text" id="purchase-item" placeholder="Input here...">

			<p>Purchase price:</p> <br>
			<input type="text" id="purchase-price" placeholder="Input here...">
			<button id="purchase-btn" onclick="addExpenses()">Add Expenses</button>
			<img id="add-expenses-loader" src="../images/icon/loading.gif">
			<i id="add-expenses-success">Success! <strong>&check;</strong></i>

			<p>All Expenses:</p> <br>
			<table>
				<thead>
					<tr>
						<th width="12%">No.</th>
						<th>Purchase item</th>
						<th width="20%">Price</th>
						<th width="18%">Action</th>
					</tr>
				</thead>
				<tbody id="add-expenses"></tbody>
			</table>
		</div>
	</div>
</div>

<div id="event-list" style="display: none"></div>
<div id="request-list" style="display: none"></div>


