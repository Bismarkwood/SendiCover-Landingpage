import problemImg1 from '../../assets/problem-1.png';
import problemImg2 from '../../assets/problem-2.png';
import '../../styles/ProblemSection.css';

export function ProblemSection() {
  return (
    <section className="problem-section" id="problem">
      <div className="problem-container">
        
        {/* Section Header */}
        <div className="problem-header">
          <div className="problem-pill">THE PROBLEM</div>
          <h2 className="problem-heading">
            Your loved ones depend on you.<br />
            <span className="problem-heading-blue">What happens if something goes wrong?</span>
          </h2>
          <p className="problem-description">
            Many friends and families have no way to protect the people and assets they care about across borders.
            When the unexpected happens, the financial burden falls entirely on you. Protect changes that.
          </p>
        </div>

        {/* Images Grid */}
        <div className="problem-images">
          <img src={problemImg1} alt="Family depending on you" className="problem-img" loading="lazy" />
          <img src={problemImg2} alt="Protecting your family" className="problem-img" loading="lazy" />
        </div>

      </div>
    </section>
  );
}
