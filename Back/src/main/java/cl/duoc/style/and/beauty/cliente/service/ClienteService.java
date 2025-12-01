package cl.duoc.style.and.beauty.cliente.service;

import cl.duoc.style.and.beauty.cliente.dto.ClienteDTO;
import cl.duoc.style.and.beauty.cliente.dto.ClienteRequestDTO;
import cl.duoc.style.and.beauty.cliente.model.Cliente;
import cl.duoc.style.and.beauty.cliente.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    private final ClienteRepository repo;

    public ClienteService(ClienteRepository repo) {
        this.repo = repo;
    }

    private ClienteDTO toDTO(Cliente c) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(c.getId());
        dto.setNombre(c.getNombre());
        dto.setCorreo(c.getCorreo());
        dto.setTelefono(c.getTelefono());
        return dto;
    }

    public ClienteDTO save(ClienteRequestDTO dto) {
        Cliente c = new Cliente();
        c.setNombre(dto.getNombre());
        c.setCorreo(dto.getCorreo());
        c.setTelefono(dto.getTelefono());
        return toDTO(repo.save(c));
    }

    public List<ClienteDTO> findAll() {
        return repo.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ClienteDTO findById(Long id) {
        return repo.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
