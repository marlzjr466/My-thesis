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
					<p class="edit-profile" onclick="editProfile()">Update Profile</p>
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

				<div class="info-wrapper">
					<p>
						<span>
							<img src="../images/icon/password.png">
						</span>
						<label id="mypassword"></label>
					</p>
					<label class="title">Password</label>
				</div>
			</div>
		</div>
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
<div id="active-event-wrapper" style="display: none"></div>
<div id="previous-event-wrapper" style="display: none"></div>


