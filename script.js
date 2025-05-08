// Korrekt initialisering av Supabase-klienten
const { createClient } = supabase;
const supabaseClient = createClient(
    "https://dibqxlbtjblgrjumpecb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpYnF4bGJ0amJsZ3JqdW1wZWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMjQ1MDEsImV4cCI6MjA2MDkwMDUwMX0.g2LvQx90JX-ghuT7hGLr8_QcOS_3ut3cF4MJaVX9j_k"
);

// Få tak i skjemaet
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            navn: document.getElementById("navn").value,
            epost: document.getElementById("epost").value,
            melding: document.getElementById("melding").value,
        };

        try {
            // Send data til Supabase - bruk supabaseClient, ikke supabase
            const { data, error } = await supabaseClient
                .from("kontaktmeldinger")
                .insert([formData]);

            if (error) throw error;

            alert("Takk for din melding! Den er lagret i databasen.");
            this.reset();
        } catch (error) {
            console.error("Feil ved sending av data:", error);
            alert("Beklager, noe gikk galt ved sending av skjemaet.");
        }
    });
} else {
    console.error("Skjemaet ble ikke funnet i dokumentet.");
}
