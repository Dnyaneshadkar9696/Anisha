import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class AdminGetSubjectsServlet extends HttpServlet {

 protected void doGet(HttpServletRequest request, HttpServletResponse response)
 throws ServletException, IOException {

  try {

   Class.forName("org.postgresql.Driver");

   Connection con = DriverManager.getConnection(
   "jdbc:postgresql://localhost:5432/studyhub",
   "postgres",
   "postgres");

   String query = "SELECT * FROM subject ORDER BY subject_id";

   Statement stmt = con.createStatement();
   ResultSet rs = stmt.executeQuery(query);

   request.setAttribute("subjects", rs);

   RequestDispatcher rd = request.getRequestDispatcher("ManageSubject.jsp");
   rd.forward(request, response);

  } catch(Exception e){
   e.printStackTrace();
  }
 }
}