export function SocCapMessages({ vorHouseSocCap, requestSocCap }: { vorHouseSocCap: number; requestSocCap: number }) {
  return (
    <>
      <div>Соц. капитал семьи: {vorHouseSocCap}</div>
      <div>Сумма трат соц. капа: {requestSocCap}</div>
      {vorHouseSocCap < requestSocCap && <div>Соц. кап. заявки превышает соц. кап. семьи</div>}
    </>
  );
}
