'use client';

import { cn } from '@/lib/utils';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { GLOBAL_ROLES } from '@/const/roles';

const redirectByRole = {
	[GLOBAL_ROLES.SUPER_ADMIN]: '/dashboard/super-admin',
	[GLOBAL_ROLES.ADMIN]: '/dashboard',
	[GLOBAL_ROLES.USER]: '/dashboard',
};

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { data: session } = useSession();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			const globalRole = session?.user.globalRole;

			if (!globalRole) {
				setError('Usuario o contraseña incorrectos');
			} else {
				window.location.href = redirectByRole[globalRole as keyof typeof redirectByRole];
			}
		} catch {
			setError('Ocurrió un error inesperado');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn('flex flex-col gap-8', className)} {...props}>
			{/* Logo */}
			<div className="flex items-center gap-2">
				<div className="flex h-7 w-7 items-center justify-center rounded-sm text-xs font-bold border border-barber-gold text-barber-gold">
					B
				</div>
				<div className="h-4 w-px bg-barber-gold" />
				<span className="text-sm font-semibold tracking-widest uppercase text-barber-gold">Barber Shop</span>
			</div>

			{/* Encabezado */}
			<div className="flex flex-col gap-1">
				<h1 className="text-3xl font-bold text-white">Bienvenido</h1>
				<p className="text-sm text-barber-muted">Ingresa tus credenciales para acceder al panel</p>
			</div>

			{/* Formulario */}
			<form onSubmit={handleSubmit} className="flex flex-col gap-5">
				{/* Correo electrónico */}
				<div className="flex flex-col gap-1.5">
					<label htmlFor="email" className="text-sm font-medium text-barber-muted">
						Correo electrónico
					</label>
					<input
						id="email"
						type="email"
						placeholder="nombre@barbershop.com"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="barber-input w-full rounded-md px-3 py-2 text-sm text-white outline-none transition-colors bg-barber-input-bg border border-barber-input-border caret-barber-gold"
					/>
				</div>

				{/* Contraseña */}
				<div className="flex flex-col gap-1.5">
					<label htmlFor="password" className="text-sm font-medium text-barber-muted">
						Contraseña
					</label>
					<div className="relative">
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="barber-input w-full rounded-md px-3 py-2 pr-10 text-sm text-white outline-none transition-colors bg-barber-input-bg border border-barber-input-border caret-barber-gold"
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70 text-barber-muted"
							tabIndex={-1}
							aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
						>
							{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
						</button>
					</div>
				</div>

				{/* Botón */}
				<button
					type="submit"
					disabled={isLoading}
					className="w-full rounded-md py-2 text-sm font-semibold transition-colors disabled:opacity-60 bg-barber-gold text-barber-gold-foreground hover:bg-barber-gold-hover"
				>
					{isLoading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : 'Iniciar Sesión'}
				</button>

				{/* Error */}
				{error && <p className="text-center text-sm text-destructive">{error}</p>}

				{/* Olvidaste contraseña */}
				<a href="#" className="text-center text-sm transition-opacity hover:opacity-70 text-barber-muted">
					¿Olvidaste tu contraseña?
				</a>
			</form>
		</div>
	);
}
