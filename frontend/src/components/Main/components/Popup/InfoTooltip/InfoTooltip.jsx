export default function InfoTooltip({ icon, message }) {
  return (
    <div className="info-tooltip">
      <img src={icon} alt="ícone" className="info-tooltip__icon" />
      <p className="info-tooltip__message">{message}</p>
    </div>
  );
}
