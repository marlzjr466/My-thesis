<?php 
	header ("Access-Control-Allow-Origin: *");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	header ("Access-Control-Allow-Headers: *");
?>

<div class="ministry-content">
	<div class="ministry-nav">
		<p id="all-ministry-title">List of Ministries</p>
		<p id="add-ministry-title">Adding of Ministry</p>
	</div>

	<div class="all-ministry-container"><br>
		<table>
			<thead>
				<tr>
					<th width="10%">#</th>
					<th width="65%">Ministry name</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody id="ministry-list"></tbody>
		</table>
	</div>

	<div class="add-ministry-container">
		<div id="wrapper">
			<i id="field-required">This field is required!</i>
			<label>Ministry name:</label> <br>
			<input type="hidden" id="ministryID">
			<input type="text" id="ministryName"> <br><br>
			<label>Ministry description:</label> <br>
			<textarea id="ministryDesc"></textarea> <br>
			<button id="addMinistryBtn" onclick="execAddOrUpdateMinistry()">ADD</button>
			<input type="hidden" id="deleteMinistryID">
		</div>
	</div>
</div>

<b style="display:none;" id="eventMonth"></b>
<b style="display:none;" id="eventYear"></b>
<div id="view-calendar" style="display:none;"></div>
<div id="displayEvent" style="display:none;"></div>
<div id="previous-event-wrapper" style="display:none;"></div>