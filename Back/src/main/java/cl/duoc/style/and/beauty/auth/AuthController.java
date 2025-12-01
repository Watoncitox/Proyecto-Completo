package cl.duoc.style.and.beauty.auth;

import cl.duoc.style.and.beauty.usuario.model.Usuario;
import cl.duoc.style.and.beauty.usuario.repository.UsuarioRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Token no enviado");
            }

            String token = authHeader.substring(7);

            // Validar token con Firebase
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            String email = decodedToken.getEmail();

            // Buscar usuario por correo en Oracle
            Usuario usuario = usuarioRepository.findByCorreo(email)
                    .orElse(null);

            if (usuario == null) {
                return ResponseEntity.status(404).body("Usuario no encontrado en Oracle");
            }

            return ResponseEntity.ok(new LoginResponse(
                    usuario.getId(),
                    usuario.getNombre(),
                    usuario.getCorreo(),
                    usuario.getRol(),
                    token
            ));

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Token inválido: " + e.getMessage());
        }
    }

    record LoginResponse(Long id, String nombre, String correo, String rol, String token) {}
}
