<?php 
	header ("Access-Control-Allow-Origin: *");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	header ("Access-Control-Allow-Headers: *");
?>

<div class="church-content">
	<div class="church-nav">
		<p id="all-church-title">List of Churches</p>
		<p id="add-church-title">Adding of Church</p>
	</div>

	<div class="all-church-container"><br>
		<select onchange="getChurchesFilter(this.value)">
			<option value="All">All</option>
			<option value="Pioneering">Pioneering</option>
			<option value="Sovereign">Sovereign</option>
			<option value="Establish">Establish</option>
		</select>
		<p>Select church type:</p>
		<table>
			<thead>
				<tr>
					<th width="8%">#</th>
					<th width="25%">Church name</th>
					<th width="40%">Address</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody id="church-list"></tbody>
		</table>
	</div>

	<div class="add-church-container">
		<div id="wrapper">
			<i id="field-required">This field is required!</i>
			<label>Church photo:</label> <br>
			<div id="photo-wrapper">
				<img id="output">
				<img style="width: 100%; height: 100%; display:none" id="updateChurch">				
			</div>
			<input type="file" id="churchPhoto" onchange="loadFileChurch(event) || angular.element(this).scope().fileSelected(this)"> <br>
			<label>Church name:</label> <br>
			<input type="hidden" id="churchID">
			<input type="text" id="churchName"> <br>
			<label>Church Address:</label> <br>
			<input type="text" id="churchAddress"> <br>
			<label>Type of church:</label> <br>
			<select id=churchType>
				<option value="">Choose here..</option>
				<option value="Pioneering">Pioneering</option>
				<option value="Sovereign">Sovereign</option>
				<option value="Establish">Establish</option>
			</select>
			<label>Assign Host Pastor:</label> <br>
			<select id="churchPastor"></select>
			<button id="addChurchBtn" onclick="execAddOrUpdateChurch()">ADD</button>
			<input type="hidden" id="deleteChurchID">
			<input type="hidden" id="deleteChurchType">
		</div>
	</div>
</div>

<b style="display:none;" id="eventMonth"></b>
<b style="display:none;" id="eventYear"></b>
<div id="view-calendar" style="display:none;"></div>
<div id="displayEvent" style="display:none;"></div>
<div id="previous-event-wrapper" style="display:none;"></div>