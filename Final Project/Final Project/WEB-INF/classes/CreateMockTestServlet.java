import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.*;
import javax.servlet.http.*;

public class CreateMockTestServlet extends HttpServlet
 {
     Connection con;
        PreparedStatement ps;
        ResultSet rs;
   
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {
        String courseId = request.getParameter("course_id");
        List<String[]> subjects = new ArrayList<>();
        if(courseId == null|| courseId.equals(""))
    {
        response.getWriter().println("Course ID missing in URL");
        return;
    }
       

        try
        {
            Class.forName("org.postgresql.Driver");
            con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub", "postgres", "postgres");
            String sql="SELECT subject_id, subject_name FROM subject WHERE course_id = ?";
            ps = con.prepareStatement(sql);
            ps.setInt(1, Integer.parseInt(courseId));
            rs = ps.executeQuery();
            while(rs.next())
            {
                String[] subject = new String[2];
                subject[0] = rs.getString("subject_id");
                subject[1] = rs.getString("subject_name");

                subjects.add(subject);
            }


            request.setAttribute("subjects", subjects);
            System.out.println("Subjects fetched: " + subjects.size());
            rs.close();
            ps.close();
            con.close();
       
            RequestDispatcher rd = request.getRequestDispatcher("/mocktestJSP.jsp");
            rd.forward(request, response);
       
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
    {
       try
       {
            String test_name=request.getParameter("test_name");
            int duration=Integer.parseInt(request.getParameter("duration"));
           
            int total_marks=Integer.parseInt(request.getParameter("total_marks"));
            int total_ques=Integer.parseInt(request.getParameter("total_ques"));
            int subject_id = Integer.parseInt(request.getParameter("subject_id"));
            String form_link = request.getParameter("form_link");

            Class.forName("org.postgresql.Driver");
            Connection con=DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub","postgres","postgres");
            String sql="insert into mocktest(test_name, duration, total_marks, total_ques, subject_id, form_link) values(?,?,?,?,?,?)";
           
            PreparedStatement ps=con.prepareStatement(sql);
            ps.setString(1,test_name);
            ps.setInt(2,duration);
            ps.setInt(3,total_marks);
            ps.setInt(4,total_ques);
            ps.setInt(5, subject_id);
            ps.setString(6, form_link);
            int result = ps.executeUpdate();

            if(result>0)
            {
                response.sendRedirect("CreateMockTestServlet?msg=success");
            }
            else
            {
                response.sendRedirect("CreateMockTestServlet?msg=error");
            }
 
            ps.close();
            con.close();
        }
        catch(Exception e)
        {
            e.printStackTrace();
            response.sendRedirect("CreateMockTestServlet?course_id=1&msg=error");
        }

    }
   
}
