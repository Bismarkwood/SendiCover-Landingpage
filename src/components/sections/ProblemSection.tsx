import '../../styles/ProblemSection.css';

export function ProblemSection() {
  return (
    <section className="problem-section" id="problem">
      <div className="problem-container">
        
        {/* Section Header */}
        <div className="problem-header">
          <div className="problem-pill">THE PROBLEM</div>
          <h2 className="problem-heading">
            When something happens back home, the call often comes to you.
          </h2>
          <p className="problem-description">
            A hospital bill. A funeral cost. A family emergency. For many diaspora families, support
            starts when the pressure is already high. Sendi helps you plan before that moment.
          </p>
        </div>

      </div>
    </section>
  );
}
