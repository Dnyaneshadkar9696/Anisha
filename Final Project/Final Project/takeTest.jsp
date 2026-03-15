<jsp:include page="header.jsp" />

<div class="test-container">
    <div class="test-header">
        <h2>Now Attempting: ${testName}</h2>
        <p>Please do not refresh the page until you submit the form.</p>
    </div>

    <div class="video-container">
        <iframe 
            src="${formLink}" 
            width="100%" 
            height="800" 
            frameborder="0" 
            marginheight="0" 
            marginwidth="0">
            Loading…
        </iframe>
    </div>
</div>

<jsp:include page="footer.jsp" />