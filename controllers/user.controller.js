import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getuser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const currentUserId = req.userId;
    if (id !== currentUserId) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    const {password,avatar, ...inputs} = req.body;

    let updatedPassword=null;
    if(password){
        const salt = await bcrypt.genSalt(10);
        updatedPassword = await bcrypt.hash(password, salt);
    }

    try {
        const user = await prisma.user.update({
            where: { id: id },
            data: {
                ...inputs,
               ...(updatedPassword && { password: updatedPassword }),
               ...(avatar && { avatar: avatar }),
            }
        });
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const currentUserId = req.userId;
    if (id !== currentUserId) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    try {
        const user = await prisma.user.delete({
            where: { id: id },
        });
        res.status(200).json({ message: "user deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}