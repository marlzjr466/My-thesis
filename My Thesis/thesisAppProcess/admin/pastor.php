<?php 
	header ("Access-Control-Allow-Origin: *");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	header ("Access-Control-Allow-Headers: *");
?>

<div class="pastor-content">
	<div class="pastor-nav">
		<p id="all-pastor-title">List of Pastors</p>
		<p id="add-pastor-title">Adding of Pastor</p>
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

	<div class="add-pastor-container"> <br><br>
		<div class="top-div">
			<div id="img-wrapper">
				<img id="outputPastor">
				<img style="width: 100%; height: 100%; display:none" id="pastorChurch">	
			</div>
			<input type="hidden" id="pastorID">
			<label>Firstname:</label><br>
			<input type="text" id="pastorFname">
			<label>Middlename:</label><br>
			<input type="text" id="pastorMname">
			<label>Lastname:</label><br>
			<input type="text" id="pastorLname">
			<input id="type-file" type="file" id="pastorPhoto" onchange="loadFilePastor(event) || angular.element(this).scope().fileSelected(this)">
			<label id="gender">Gender</label><br>
			<select id="pastorGender">
				<option value="">Choose here</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
			</select>
			<label id="add">Address:</label><br>
			<input id="pastorAddress" type="text" name="">
			<label id="no">Contact No:</label><br>
			<input id="pastorContact" type="text" name="">
			<label id="no">Birthdate:</label><br>
			<div id="bday">
				<select id="pastorBdayMM">
					<option value="">Month</option>
					<option value="1">January</option>
					<option value="2">February</option>
					<option value="3">March</option>
					<option value="4">April</option>
					<option value="5">May</option>
					<option value="6">June</option>
					<option value="7">July</option>
					<option value="8">August</option>
					<option value="9">September</option>
					<option value="10">October</option>
					<option value="11">November</option>
					<option value="12">December</option>
				</select>
				<select id="pastorBdayDD">
					<option value="">Day</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
					<option value="11">11</option>
					<option value="12">12</option>
					<option value="13">13</option>
					<option value="14">14</option>
					<option value="15">15</option>
					<option value="16">16</option>
					<option value="17">17</option>
					<option value="18">18</option>
					<option value="19">19</option>
					<option value="20">20</option>
					<option value="21">21</option>
					<option value="22">22</option>
					<option value="23">23</option>
					<option value="24">24</option>
					<option value="25">25</option>
					<option value="26">26</option>
					<option value="27">27</option>
					<option value="28">28</option>
					<option value="29">29</option>
					<option value="30">30</option>
					<option value="31">31</option>
				</select>
				<input type="number" placeholder="Year" id="pastorBdayYYYY"><br>
			</div>
			<button id="generate" onclick="generateCode()">Generate temporary password</button>
			<input type="text" id="displayCode" readonly>
			<button id="addPastorBtn" onclick="execAddorUpdatePastor()">ADD</button>
		</div>
	</div>
</div>

<b style="display:none;" id="eventMonth"></b>
<b style="display:none;" id="eventYear"></b>
<div id="view-calendar" style="display:none;"></div>
<div id="displayEvent" style="display:none;"></div>
<div id="previous-event-wrapper" style="display:none;"></div>

