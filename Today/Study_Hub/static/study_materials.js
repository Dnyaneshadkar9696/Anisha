document.addEventListener('DOMContentLoaded', function () {
    const user = requireLogin('login.html');
    if (!user) return;

    loadStudyMaterials();
});

function loadStudyMaterials() {
    fetch('GetStudyMaterialsServlet')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('materialsGrid');
            if (!data || data.length === 0) {
                grid.innerHTML = '<p class="no-data">No study materials available.</p>';
                return;
            }

            const html = data.map(item => `
                <div class="study-material-card">
                    <h3>${item.subject_name}</h3>
                    <p>Access the study material for this subject.</p>
                    <a href="${item.file_url}" target="_blank" class="btn-material">Open Material</a>
                </div>
            `).join('');

            grid.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading study materials:', error);
            document.getElementById('materialsGrid').innerHTML = '<p class="no-data">Unable to load study materials.</p>';
        });
}
