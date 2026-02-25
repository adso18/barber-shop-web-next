import { LoginForm } from '@/components/login-form';

export default function Page() {
	return (
		<div className="flex min-h-screen w-full bg-barber-bg">
			{/* Lado izquierdo — área oscura (reservada para imagen o branding futuro) */}
			<div className="hidden lg:block lg:w-1/2 bg-barber-surface" />

			{/* Lado derecho — formulario de login */}
			<div className="flex w-full lg:w-1/2 items-center justify-center p-10">
				<div className="w-full max-w-sm">
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
