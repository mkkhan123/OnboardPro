import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string | null;
    const photo = formData.get('photo') as File | null;
    const location = formData.get('location') as string | null;

    // TODO: Add database logic here
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Save the new user to the database
    // 4. If photo exists, upload it to a storage service (e.g., S3, Cloudinary)

    console.log("New user signup:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Phone:", phone);
    if (photo) {
        console.log("Photo:", photo.name, photo.size, "bytes");
    }
    console.log("Location:", location);

    // For now, just return a success response
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
} 