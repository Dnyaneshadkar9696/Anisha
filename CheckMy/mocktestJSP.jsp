<%@ page import="java.sql.*,java.util.*" %>

<jsp:include page="header.jsp" />

<div class="admin-header">
	<h1>Create Mock Test</h1>
	<p>Fill in the test details and attach the Google Form link for students.</p>
</div>

<div class="admin-form">
	<h2>Test Details</h2>

	<form action="CreateMockTestServlet" method="post">
		<div class="form-group">
			<label for="test_name">Mock Test Name</label>
			<input type="text" id="test_name" name="test_name" placeholder="Enter mock test title" required>
		</div>

		<div class="form-group">
			<label for="duration">Duration (Minutes)</label>
			<input type="number" id="duration" name="duration" placeholder="e.g. 60" min="1" required>
		</div>

		<div class="form-group">
			<label for="total_marks">Total Marks</label>
			<input type="number" id="total_marks" name="total_marks" placeholder="e.g. 100" min="1" required>
		</div>

		<div class="form-group">
			<label for="total_ques">Total Questions</label>
			<input type="number" id="total_ques" name="total_ques" placeholder="e.g. 50" min="1" required>
		</div>

		<div class="form-group">
			<label for="subject_id">Select Subject</label>
			<select id="subject_id" name="subject_id" required>
				<option value="">Select Subject</option>
				<%
				List<String[]> subjects = (List<String[]>) request.getAttribute("subjects");

				if (subjects != null && !subjects.isEmpty()) {
					for (String[] subject : subjects) {
				%>
				<option value="<%=subject[0]%>"><%=subject[1]%></option>
				<%
					}
				} else {
				%>
				<option value="">No Subjects Available</option>
				<%
				}
				%>
			</select>
		</div>

		<div class="form-group">
			<label for="form_link">Google Form Link (Embed Link)</label>
			<input
				type="url"
				id="form_link"
				name="form_link"
				placeholder="https://docs.google.com/forms/d/e/.../viewform"
				required>
		</div>

		<div class="form-buttons">
			<button type="submit" class="btn-submit">Create Mock Test</button>
		</div>
	</form>
</div>
<%
    String msg = request.getParameter("msg");

    if("success".equals(msg))
    {
%>

<div class="success-msg">
    Mock Test Created Successfully!
</div>

<%
    }
    else if("error".equals(msg))
    {
%>

<div class="error-msg">
    Error creating mock test.
</div>

<%
    }
%>

<jsp:include page="footer.jsp" />