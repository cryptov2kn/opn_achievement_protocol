export async function getCredentialList(wallet: string) {
  const response = await fetch(
    `/api/credential/list?wallet=${encodeURIComponent(wallet)}`,
    {
      cache: "no-store",
    },
  );

  return response.json();
}
