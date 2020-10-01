<?php 
	header ("Access-Control-Allow-Origin: *");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	header ("Access-Control-Allow-Headers: *");
?>

<div class="pastor-content">
	<div class="pastor-nav">
		<p id="all-pastor-title">List of Pastors</p>
		<!-- <p id="add-pastor-title">Adding of Pastor</p> -->
	</div>

	<div class="all-pastor-container"><br>
		<table>
			<thead>
				<tr>
					<th width="10%">#</th>
					<th width="70%">Pastor's name</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody id="pastor-list"></tbody>
		</table>
	</div>

	<div class="right-container" style="height:94%;">
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

<b style="display:none;" id="eventMonth"></b>
<b style="display:none;" id="eventYear"></b>
<div id="view-calendar" style="display:none;"></div>
<div id="displayEvent" style="display:none;"></div>
<div id="previous-event-wrapper" style="display:none;"></div>

