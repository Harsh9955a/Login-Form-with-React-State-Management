import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
  Fade,
  Stack,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useAuth } from '../hooks/useAuth';

/* ---------- Validation rules ---------- */
const EMAIL_RULES = {
  required: 'Email address is required.',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Enter a valid email address.',
  },
};

const PASSWORD_RULES = {
  required: 'Password is required.',
  minLength: { value: 8, message: 'Password must be at least 8 characters.' },
  validate: {
    hasUppercase: (v) => /[A-Z]/.test(v) || 'Must contain at least one uppercase letter.',
    hasNumber:    (v) => /[0-9]/.test(v) || 'Must contain at least one number.',
    hasSpecial:   (v) => /[^A-Za-z0-9]/.test(v) || 'Must contain at least one special character.',
  },
};

/* ---------- Decorative background canvas ---------- */
function GoldOrb({ sx }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        ...sx,
      }}
    />
  );
}

/* ================================================== */
/*                   LoginForm                        */
/* ================================================== */
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { authState, login, reset } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const isLoading = authState.status === 'loading';
  const isSuccess = authState.status === 'success';

  const onSubmit = (data) => {
    reset();
    login(data);
  };

  return (
    /* ── Full-page wrapper ── */
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A0A12 0%, #0F0F1E 50%, #0A0C18 100%)',
        px: 2,
      }}
    >
      {/* Ambient orbs */}
      <GoldOrb sx={{ width: 500, height: 500, top: -180, right: -140 }} />
      <GoldOrb sx={{ width: 380, height: 380, bottom: -140, left: -100 }} />

      {/* Subtle grid texture */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Card ── */}
      <Fade in timeout={600}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 440,
            background: 'rgba(18,18,30,0.82)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(201,168,76,0.14)',
            borderRadius: 3,
            p: { xs: 4, sm: 5 },
            boxShadow: '0 32px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.06)',
          }}
        >
          {/* ── Header ── */}
          <Stack alignItems="center" spacing={1} mb={4}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C9A84C, #9C7A28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
                boxShadow: '0 4px 20px rgba(201,168,76,0.35)',
              }}
            >
              <LockOutlinedIcon sx={{ color: '#0E0E14', fontSize: 24 }} />
            </Box>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.7rem', sm: '2rem' }, color: '#EDE8DC' }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              Sign in to your account to continue
            </Typography>
          </Stack>

          {/* ── Feedback Alerts ── */}
          <Collapse in={authState.status === 'success'}>
            <Alert
              severity="success"
              onClose={reset}
              sx={{ mb: 3, background: 'rgba(76,175,125,0.12)', border: '1px solid rgba(76,175,125,0.3)' }}
            >
              {authState.message}
            </Alert>
          </Collapse>

          <Collapse in={authState.status === 'error'}>
            <Alert
              severity="error"
              onClose={reset}
              sx={{ mb: 3, background: 'rgba(224,92,106,0.12)', border: '1px solid rgba(224,92,106,0.3)' }}
            >
              {authState.message}
            </Alert>
          </Collapse>

          {/* ── Form ── */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            {/* Email */}
            <Controller
              name="email"
              control={control}
              rules={EMAIL_RULES}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isLoading || isSuccess}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon
                          fontSize="small"
                          sx={{
                            color: errors.email
                              ? 'error.main'
                              : touchedFields.email && !errors.email
                              ? 'primary.main'
                              : 'text.secondary',
                            transition: 'color 0.25s',
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              rules={PASSWORD_RULES}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isLoading || isSuccess}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon
                          fontSize="small"
                          sx={{
                            color: errors.password
                              ? 'error.main'
                              : touchedFields.password && !errors.password
                              ? 'primary.main'
                              : 'text.secondary',
                            transition: 'color 0.25s',
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((p) => !p)}
                          edge="end"
                          disabled={isLoading || isSuccess}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon fontSize="small" />
                          ) : (
                            <VisibilityOutlinedIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Forgot password link */}
            <Box sx={{ textAlign: 'right', mt: -1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'primary.light',
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading || isSuccess || !isValid}
              sx={{
                mt: 1,
                position: 'relative',
                background: isSuccess
                  ? 'linear-gradient(90deg, #4CAF7D, #3D9668)'
                  : 'linear-gradient(90deg, #C9A84C, #9C7A28)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #E2C97E, #B08A35)',
                },
                '&.Mui-disabled': {
                  background: 'rgba(201,168,76,0.15)',
                  color: 'rgba(201,168,76,0.35)',
                },
                transition: 'background 0.4s',
              }}
            >
              {isLoading ? (
                <CircularProgress size={22} thickness={4} sx={{ color: '#0E0E14' }} />
              ) : isSuccess ? (
                'Signed In ✓'
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>

          {/* ── Divider + Demo Hint ── */}
          <Divider sx={{ my: 3, borderColor: 'rgba(201,168,76,0.1)' }} />

          <Box
            sx={{
              background: 'rgba(201,168,76,0.05)',
              border: '1px dashed rgba(201,168,76,0.15)',
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography
              variant="caption"
              display="block"
              sx={{ color: 'text.secondary', mb: 0.5, letterSpacing: '0.05em', textTransform: 'uppercase' }}
            >
              Demo Credentials
            </Typography>
            <Typography variant="caption" display="block" sx={{ color: '#C9A84C', fontFamily: 'monospace' }}>
              admin@example.com / Admin@1234
            </Typography>
            <Typography variant="caption" display="block" sx={{ color: '#6C8EAD', fontFamily: 'monospace' }}>
              user@example.com / User@5678
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
}
