import { SignJWT, jwtVerify } from "jose";


const secretKey = process.env.JWT_SECRET;


if (!secretKey) {
  throw new Error("JWT_SECRET is missing");
}


const secret = new TextEncoder().encode(
  secretKey
);


export async function createToken(
  payload: {
    id: string;
    role: string;
    email: string;
  }
){

  return await new SignJWT(payload)

    .setProtectedHeader({
      alg: "HS256"
    })

    .setIssuedAt()

    .setExpirationTime("7d")

    .sign(secret);

}



export async function verifyToken(
  token:string
){

  const {payload} = await jwtVerify(
    token,
    secret
  );


  return payload;

}